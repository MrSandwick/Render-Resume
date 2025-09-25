import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Bocky({ url = '/models/bocky.glb', ...props }) {
	const ref = useRef()
	const { scene } = useGLTF(url)
	return <primitive ref={ref} object={scene} {...props} />
}