import React from 'react'
import { Environment, ContactShadows, Sky } from '@react-three/drei'

export default function SceneLights() {
	return (
		<>
			<fog attach="fog" args={['#0a0f1a', 8, 28]} />
			<Sky
				distance={450000}
				turbidity={6}
				rayleigh={3.5}
				mieCoefficient={0.004}
				mieDirectionalG={0.8}
				inclination={0.49}
				azimuth={0.25}
			/>
			<hemisphereLight args={[0xffffff, 0x222233, 0.65]} />
			<directionalLight position={[6, 6, 6]} intensity={1.15} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
			<ContactShadows position={[0, -0.01, 0]} opacity={0.4} blur={2} far={6} />
			<Environment preset="city" />
		</>
	)
}
