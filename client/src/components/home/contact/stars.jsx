import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as random from 'maath/random/dist/maath-random.esm'

export function Stars() {
	const ref = useRef()

	// Build a clean Float32Array of xyz triplets
	const positions = useMemo(() => {
		const COUNT = 400
		const arr = new Float32Array(COUNT * 3)
		try {
			random.inSphere(arr, { radius: 1 })
		} catch {
			// Fallback: uniform-ish sphere
			for (let i = 0; i < arr.length; i += 3) {
				const r = 1 * Math.cbrt(Math.random())
				const t = Math.random() * Math.PI * 2
				const p = Math.acos(2 * Math.random() - 1)
				arr[i + 0] = r * Math.sin(p) * Math.cos(t)
				arr[i + 1] = r * Math.sin(p) * Math.sin(t)
				arr[i + 2] = r * Math.cos(p)
			}
		}
		for (let i = 0; i < arr.length; i++) if (!Number.isFinite(arr[i])) arr[i] = 0
		return arr
	}, [])

	useFrame((_, delta) => {
		if (!ref.current) return
		ref.current.rotation.x -= delta / 10
		ref.current.rotation.y -= delta / 15
	})

	return (
		<group ref={ref} rotation={[0, 0, Math.PI / 4]}>
			<points frustumCulled>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						array={positions}
						count={positions.length / 3}
						itemSize={3}
					/>
				</bufferGeometry>
				<pointsMaterial
					color="#f272c8"
					size={0.002}
					sizeAttenuation
					depthWrite={false}
					transparent
				/>
			</points>
		</group>
	)
}
