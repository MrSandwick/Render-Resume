import React, { useMemo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function RoomModel({ scale = 1, debug = true }) {
	const { scene } = useGLTF('/models/room.glb')
	const inst = useMemo(() => scene.clone(true), [scene])
	const infoDivRef = useRef()

	return <primitive object={inst} />
}

useGLTF.preload('/models/room.glb')
