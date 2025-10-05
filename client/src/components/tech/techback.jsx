import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

// --- Single low-poly sphere ---
function LowPolySphere({ position=[0,0,0], scale=1, spin=[0.001, 0.002] }) {
	const ref = useRef()
	// geometry: radius=1, detail=0 (icosahedron = nice low-poly)
	const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), [])
	const mat = useMemo(() => new THREE.MeshStandardMaterial({
		flatShading: true,
		metalness: 0.1,
		roughness: 0.8,
		color: new THREE.Color(`hsl(${Math.floor(Math.random()*360)}, 60%, 55%)`)
	}), [])

	useFrame(() => {
		if (!ref.current) return
		ref.current.rotation.y += spin[1]
		ref.current.rotation.x += spin[0]
	})

	return (
		<mesh ref={ref} position={position} scale={scale} geometry={geo} material={mat} />
	)
}

// --- Smooth camera movement on scroll ---
function CameraOnScroll() {
	const { camera } = useThree()
	const target = useRef({ y: 0, z: 8 })

	useEffect(() => {
		const onScroll = () => {
			const t = window.scrollY / window.innerHeight
			target.current.z = 8 + t * 3		// dolly out as you scroll
			target.current.y = t * 2			// slight rise
			target.current.x = Math.sin(t) * 10 // <-- X movement
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useFrame(() => {
		// smooth lerp toward target
		camera.position.z = THREE.MathUtils.lerp(camera.position.z, target.current.z, 0.08)
		camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y, 0.08)
		camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.08)
		camera.lookAt(0, 0, -6)
	})

	return null
}

export default function Background() {
	// choose 5 fixed positions so they sit around the screen edges/background
	const items = useMemo(() => ([
		{ pos: [-8,  3, -20], scale: 1.2, spin: [0.0008, 0.0015] },
		{ pos: [ 10, -5, -9], scale: 2, spin: [0.0006, 0.0012] },
		{ pos: [-8, -5, -6], scale: 4.0, spin: [0.0005, 0.0010] },
		{ pos: [ 3,  3, -5], scale: 0.9,  spin: [0.0007, 0.0013] },
		{ pos: [ 0,  0, -9], scale: 1.4,  spin: [0.0004, 0.0009] },
		{ pos: [ 3,  -7, -9], scale: 1.4,  spin: [0.0004, 0.0009] },
		{ pos: [ -1,  -12, -8], scale: 2,  spin: [0.0004, 0.0009] },
		{ pos: [ -8,  10, -9], scale: 1.4,  spin: [0.0004, 0.0009] },
	]), [])

	return (
		<Canvas
			style={{ position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none" }}
			camera={{ position: [0, 0, 8], fov: 50 }}
		>
			<ambientLight intensity={1.1} />
			<directionalLight position={[5, 6, 5]} intensity={1} />
			<CameraOnScroll />

			{items.map((it, i) => (
				<LowPolySphere key={i} position={it.pos} scale={it.scale} spin={it.spin} />
			))}
		</Canvas>
	)
}
