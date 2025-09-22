import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'

// Local helper (no utils folder)
function dampVector(current, target, lambda, dt) {
	current.lerp(target, 1 - Math.exp(-lambda * Math.min(dt, 1 / 30)))
}

export default function CameraRig({ stops, index, onArrive }) {
	const { camera } = useThree()
	const desiredPos = useRef(new THREE.Vector3())
	const desiredTarget = useRef(new THREE.Vector3())
	const lookTarget = useRef(new THREE.Vector3())

	useEffect(() => {
		if (!stops?.length) return
		const s = stops[0]
		camera.position.fromArray(s.position)
		lookTarget.current.fromArray(s.target)
		camera.lookAt(lookTarget.current)
	}, [camera, stops])

	useFrame((_, dt) => {
		const s = stops[index]
		if (!s) return

		desiredPos.current.fromArray(s.position)
		desiredTarget.current.fromArray(s.target)

		dampVector(camera.position, desiredPos.current, 8, dt)
		dampVector(lookTarget.current, desiredTarget.current, 8, dt)

		camera.lookAt(lookTarget.current)

		const arrived =
			camera.position.distanceTo(desiredPos.current) < 0.02 &&
			lookTarget.current.distanceTo(desiredTarget.current) < 0.02

		onArrive?.(arrived)
	})

	return null
}
