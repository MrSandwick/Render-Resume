// src/components/ModelViewer/BoomCanvas.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Preload, Bounds } from '@react-three/drei'
import Boom from './bocky'

export default function ConCanvas({ className = '' }) {
	const modelUrl = '/models/bocky.glb'
	return (
		<div className={`relative h-full ${className}`}>
			<Canvas
				shadows
				frameloop="demand"
				dpr={[1, 2]}
				gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
				camera={{ fov: 45, near: 0.1, far: 200 }}
				style={{ width: '100%', height: '100%', background: 'transparent' }}
			>
				<Suspense fallback={<Html center className="text-white/80">Loading…</Html>}>
					<ambientLight intensity={0.8} />
					<directionalLight position={[5, 5, 5]} intensity={1} />
					<Bounds fit observe clip margin={1.15}>
						<Boom url={modelUrl} />
					</Bounds>
					<Preload all />
				</Suspense>

				<OrbitControls
					makeDefault
					autoRotate
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
			</Canvas>
		</div>
	)
}
