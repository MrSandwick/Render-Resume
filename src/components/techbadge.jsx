// tabs indentation
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { useRef } from 'react'

function Shape({ type = 'box', color = '#60a5fa' }) {
	const ref = useRef()
	useFrame((state, delta) => {
		ref.current.rotation.x += 0.4 * delta
		ref.current.rotation.y += 0.6 * delta
	})
	return (
		<Float speed={2} rotationIntensity={0.6} floatIntensity={0.9}>
			<mesh ref={ref} castShadow receiveShadow>
				{type === 'box' && <boxGeometry args={[1, 1, 1]} />}
				{type === 'torus' && <torusGeometry args={[0.7, 0.25, 20, 80]} />}
				{type === 'sphere' && <sphereGeometry args={[0.8, 48, 48]} />}
				{type === 'knot' && <torusKnotGeometry args={[0.6, 0.22, 160, 24]} />}
				{type === 'cone' && <coneGeometry args={[0.8, 1.2, 48]} />}
				<meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
			</mesh>
		</Float>
	)
}

export default function TechBadge({ label, type, color }) {
	return (
		<div className="rounded-2xl bg-white/5 backdrop-blur p-3 flex flex-col items-center">
			<div className="w-40 h-40">
				<Canvas camera={{ position: [0, 1.1, 3.2], fov: 50 }} shadows>
					<ambientLight intensity={0.6} />
					<directionalLight position={[2, 3, 2]} intensity={1.1} castShadow />
					<Shape type={type} color={color} />
					<Environment preset="city" />
				</Canvas>
			</div>
			<div className="mt-3 text-sm opacity-90">{label}</div>
		</div>
	)
}
