// src/components/ModelViewer/BoomCanvas.jsx
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Preload, Bounds, Center } from '@react-three/drei'
import Boom from './bocky'

function Spinner({ speed = 0.8, clampFps = 30, children }) {
	const ref = useRef()
	useFrame((_, dt) => {
		if (!ref.current) return
		const step = Math.min(dt, 1 / clampFps)
		ref.current.rotation.y += speed * step   // rotate around local origin
	})
	return <group ref={ref}>{children}</group>
}

export default function ConCanvas({ className = '' }) {
	const modelUrl = '/models/bocky.glb'
	return (
		<div className={`relative h-full w-full cursor-grab active:cursor-grabbing ${className}`}>
			<Canvas
				shadows
				frameloop="always"
				dpr={[1, 1.5]}
				gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
				camera={{ fov: 45, near: 0.1, far: 200 }}
				style={{ width: '100%', height: '100%', background: 'transparent' }}
			>
				<Suspense fallback={<Html center className="text-white/80">Loading…</Html>}>
					<ambientLight intensity={0.8} />
					<directionalLight position={[5, 5, 5]} intensity={1} />

					{/* Fit the model, but rotate a group whose child is centered to origin */}
					<Bounds fit clip margin={1.15}>
						<Spinner speed={0.8}>
							<Center>                {/* <-- recenters model so pivot = center */}
								<Boom url={modelUrl} />
							</Center>
						</Spinner>
					</Bounds>

					<Preload all />
				</Suspense>

				<OrbitControls
					makeDefault
					enableZoom={false}
					enableDamping
					dampingFactor={0.06}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
			</Canvas>
		</div>
	)
}
