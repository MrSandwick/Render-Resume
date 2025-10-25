// tabs indentation
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { Decal, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { SPHERE_ICON_SRCS } from "../../db/sphereIcons.js" // list of icon src strings

/* ------------------------------ camera on scroll ---------------------------- */
function CameraOnScroll() {
	const { camera } = useThree()
	const target = useRef({ x: 0, y: 0, z: 8 })

	useEffect(() => {
		const onScroll = () => {
			const t = window.scrollY / window.innerHeight
			target.current.z = 8 + t * 3
			target.current.y = t * 2
			target.current.x = Math.sin(t) * 10
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useFrame(() => {
		camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.current.z, 0.08)
		camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.08)
		camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.08)
		camera.lookAt(0, 0, -6)
	})

	return null
}

/* ----------------------- single icon projection per sphere ------------------ */
/* ------------------------ LOW POLY (detail = 0) ----------------------------- */
function IconSphere({
	position = [0, 0, 0],
	scale = 1,
	spin = [0.001, 0.002],
	icon,                 // one icon src for this sphere
	decalScale = 0.95,    // size of the icon on radius=1
	radius = 1,
	detail = 0,           // ← old low-poly look (0). bump to 1/2 for smoother.
	hueSeed = 0,          // stable per-sphere color variation
}) {
	const ref = useRef()

	// stable per-sphere color (golden-angle hue)
	const color = useMemo(() => {
		const hue = (hueSeed * 137.508) % 360
		return new THREE.Color(`hsl(${hue}, 60%, 55%)`)
	}, [hueSeed])

	const mat = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				flatShading: true,
				metalness: 0.1,
				roughness: 0.8,
				color,
			}),
		[color]
	)

	const tex = useTexture(icon)
	useMemo(() => {
		if (!tex) return
		tex.anisotropy = 8
		tex.minFilter = THREE.LinearMipMapLinearFilter
		tex.magFilter = THREE.LinearFilter
		tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
	}, [tex])

	useFrame(() => {
		if (!ref.current) return
		ref.current.rotation.y += spin[1]
		ref.current.rotation.x += spin[0]
	})

	return (
		<mesh ref={ref} position={position} scale={scale} material={mat}>
			{/* LOW-POLY sphere */}
			<icosahedronGeometry args={[radius, detail]} />
			{icon && (
				<Decal
					position={[0, 0, radius * 0.92]}  // front-facing icon
					rotation={[0, 0, 0]}
					scale={[decalScale, decalScale, decalScale]}
					map={tex}
					polygonOffset
					polygonOffsetFactor={-1}
				/>
			)}
		</mesh>
	)
}

/* --------------------------------- Background ------------------------------- */
export default function Background() {
	// sphere anchors around the scene
	const items = useMemo(
		() => [
			{ pos: [-8, 3, -20],  scale: 1.2, spin: [0.0008, 0.0015] },
			{ pos: [10, -5, -9],  scale: 2.0, spin: [0.0006, 0.0012] },
			{ pos: [-8, -5, -6],  scale: 4.0, spin: [0.0005, 0.0010] },
			{ pos: [3, 3, -5],    scale: 0.9, spin: [0.0007, 0.0013] },
			{ pos: [0, 0, -9],    scale: 1.4, spin: [0.0004, 0.0009] },
			{ pos: [3, -7, -9],   scale: 1.4, spin: [0.0004, 0.0009] },
			{ pos: [-1, -12, -8], scale: 2.0, spin: [0.0004, 0.0009] },
			{ pos: [-8, 10, -9],  scale: 1.4, spin: [0.0004, 0.0009] },
		],
		[]
	)

	const L = SPHERE_ICON_SRCS.length || 1
	const detail = 0 // ← keep low poly

	return (
		<Canvas
			style={{ position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none" }}
			camera={{ position: [0, 0, 8], fov: 50 }}
		>
			<ambientLight intensity={1.1} />
			<directionalLight position={[5, 6, 5]} intensity={1} />
			<CameraOnScroll />

			{items.map((it, i) => (
				<IconSphere
					key={i}
					position={it.pos}
					scale={it.scale}
					spin={it.spin}
					icon={SPHERE_ICON_SRCS[i % L]} // different icon across spheres
					hueSeed={i}                    // stable random-ish color per sphere
					decalScale={0.95}
					radius={1}
					detail={detail}                // ← low-poly here
				/>
			))}
		</Canvas>
	)
}