// src/components/knot.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Knot() {
	const ref = useRef()

	useFrame((_, delta) => {
		if (!ref.current) return
		ref.current.rotation.y += 0.8 * delta
	})

	return (
		<mesh ref={ref} scale={1} /* disable pointer hits entirely */ raycast={null}>
			<torusKnotGeometry args={[1, 0.3, 160, 24]} />
			<meshStandardMaterial metalness={0.8} roughness={0.2} />
		</mesh>
	)
}
