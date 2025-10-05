import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Knot() {
	const ref = useRef()
	const [targetScale, setTargetScale] = useState(1)

	useFrame((state, delta) => {
		ref.current.rotation.y += 0.8 * delta
		// ease scale toward target
		const s = ref.current.scale.x
		const next = s + (targetScale - s) * Math.min(1, 10 * delta)
		ref.current.scale.set(next, next, next)
	})

	return (
		<mesh
			ref={ref}
			onPointerOver={() => setTargetScale(1.15)}
			onPointerOut={() => setTargetScale(1)}
			onClick={() => (ref.current.rotation.y += Math.PI / 2)}
		>
			<torusKnotGeometry args={[1, 0.3, 160, 24]} />
			<meshStandardMaterial metalness={0.8} roughness={0.2} />
		</mesh>
	)
}