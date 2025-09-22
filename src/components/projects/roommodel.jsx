import React, { useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export default function RoomModel({ scale = 1 }) {
	const { scene } = useGLTF('/models/room.glb')
	const inst = useMemo(() => scene.clone(true), [scene])

	useMemo(() => {
		const box = new THREE.Box3().setFromObject(inst)
		const size = new THREE.Vector3()
		box.getSize(size)
		const longest = Math.max(size.x, size.y, size.z) || 1
		const s = (2.5 / longest) * scale
		inst.scale.setScalar(s)

		const center = new THREE.Vector3()
		box.getCenter(center)
		inst.position.sub(center)
	}, [inst, scale])

	return <primitive object={inst} />
}

useGLTF.preload('/models/room.glb')
