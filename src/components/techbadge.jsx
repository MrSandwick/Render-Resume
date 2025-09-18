// tabs indentation
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useMemo } from 'react'
import { Decal, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function SpinBall({ color = '#ffffff', icon, decalScale = 0.9 }) {
	const ref = useRef()
	const tex = useTexture(icon) // e.g. "/icons/react.png"

	// make small PNGs look crisp
	useMemo(() => {
		if (!tex) return
		tex.anisotropy = 8
		tex.minFilter = THREE.LinearMipMapLinearFilter
		tex.magFilter = THREE.LinearFilter
		tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
	}, [tex])

	// random factors: only phase + amplitude, speed is fixed
	const phaseX = useRef(Math.random() * Math.PI * 2)   // random start angle
	const phaseY = useRef(Math.random() * Math.PI * 2)
	const ampX = useRef(0.1 + Math.random() * 0.15)      // random amplitude
	const ampY = useRef(0.1 + Math.random() * 0.15)

	useFrame((state) => {
		if (!ref.current) return
		const t = state.clock.getElapsedTime()
		const speed = 1.5 // same for all balls
		ref.current.rotation.x = Math.sin(t * speed + phaseX.current) * ampX.current
		ref.current.rotation.y = Math.sin(t * speed + phaseY.current) * ampY.current
	})

	return (
		<mesh ref={ref} castShadow receiveShadow>
			{/* low-poly sphere look */}
			<icosahedronGeometry args={[1, 1]} />
			<meshStandardMaterial color={color} flatShading />

			{/* icon projected onto the “front” (Z+) */}
			{icon && (
				<Decal
					position={[0, 0, 0.92]}
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

export default function ShapeCanvas({ color = '#1f2937', icon, decalScale }) {
	return (
		<Canvas
			camera={{ position: [0, 0, 3.2], fov: 50 }}
			gl={{ antialias: true, alpha: true }}
			style={{ width: '100%', height: '100%', background: 'transparent' }}
			shadows
		>
			<ambientLight intensity={0.6} />
			<directionalLight position={[3, 4, 2]} intensity={1.2} />
			<Suspense fallback={null}>
				<SpinBall color={color} icon={icon} decalScale={decalScale} />
			</Suspense>
		</Canvas>
	)
}
