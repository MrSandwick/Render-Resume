import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '../contact/stars'

export default function StarsCanvas() {
	return (
		<div className="absolute inset-0 z-0">
			<Canvas camera={{ position: [0, 0, 1] }}>
				<Suspense fallback={null}>
					<Stars />
				</Suspense>
			</Canvas>
		</div>
	)
}

