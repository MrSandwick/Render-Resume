import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, ContactShadows, Sky, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from "../components/navbar"
import { getScene } from '../db/projectData'


function RoomModel({ scale = 1 }) {
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

function CameraRig({ stops, index, onArrive }) {
	const { camera } = useThree()
	const desiredPos = useRef(new THREE.Vector3())
	const desiredTarget = useRef(new THREE.Vector3())
	const lookTarget = useRef(new THREE.Vector3())
	const damp = (current, target, lambda, dt) => {
		current.lerp(target, 1 - Math.exp(-lambda * Math.min(dt, 1 / 30)))
	}
	useEffect(() => {
		const s = stops[0]
		camera.position.fromArray(s.position)
		lookTarget.current.fromArray(s.target)
		camera.lookAt(lookTarget.current)
	}, [camera, stops])
	useFrame((_, dt) => {
		const s = stops[index]
		desiredPos.current.fromArray(s.position)
		desiredTarget.current.fromArray(s.target)
		damp(camera.position, desiredPos.current, 8, dt)
		damp(lookTarget.current, desiredTarget.current, 8, dt)
		camera.lookAt(lookTarget.current)
		const arrived =
			camera.position.distanceTo(desiredPos.current) < 0.02 &&
			lookTarget.current.distanceTo(desiredTarget.current) < 0.02
		onArrive?.(arrived)
	})
	return null
}

function Overlay({ step, arrived, slides, onWheelStep }) {
	const containerRef = useRef(null)
	const cooldown = useRef(0)
	useEffect(() => {
		const el = containerRef.current
		if (!el) return
		const onWheel = (e) => {
			e.preventDefault()
			const t = performance.now()
			if (t < cooldown.current) return
			const dir = Math.sign(e.deltaY)
			if (dir > 0) onWheelStep(1)
			else if (dir < 0) onWheelStep(-1)
			cooldown.current = t + 350
		}
		el.addEventListener('wheel', onWheel, { passive: false })
		return () => {
			el.removeEventListener('wheel', onWheel)
		}
	}, [onWheelStep])
	return (
		<div ref={containerRef} className="pointer-events-auto absolute inset-0 grid place-items-center select-none">
			<div className="w-full max-w-2xl px-6">
				<div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-70 mb-3">
					<span>Step {step + 1} / {slides.length}</span>
					<span>Scroll to navigate</span>
				</div>
				<AnimatePresence mode="popLayout">
					{arrived && (
						<motion.div
							key={step}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							className="rounded-2xl p-6 backdrop-blur bg-white/5 border border-white/10 shadow-xl"
						>
							<h2 className="text-2xl md:text-3xl font-semibold mb-2">{slides[step].title}</h2>
							<p className="text-sm md:text-base leading-relaxed opacity-90">{slides[step].body}</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}

export default function RoomShowcase() {
    const { stops, slides } = useMemo(() => getScene('roomTour'), [])

	const [step, setStep] = useState(0)
	const [arrived, setArrived] = useState(true)

	const next = useCallback((dir) => {
		setArrived(false)
		setStep((s) => Math.max(0, Math.min(stops.length - 1, s + dir)))
	}, [stops.length])

	return (
		<div className="relative h-screen w-full text-white overflow-hidden">
            <Navbar />
			<Canvas dpr={[1, 2]} camera={{ fov: 45, near: 0.1, far: 100000 }} gl={{ antialias: true, alpha: true }}>
				<fog attach="fog" args={['#0a0f1a', 8, 28]} />
				<Sky distance={450000} turbidity={6} rayleigh={3.5} mieCoefficient={0.004} mieDirectionalG={0.8} inclination={0.49} azimuth={0.25} />
				<hemisphereLight args={[0xffffff, 0x222233, 0.65]} />
				<directionalLight position={[6, 6, 6]} intensity={1.15} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
				<ContactShadows position={[0, -0.01, 0]} opacity={0.4} blur={2} far={6} />
				<group position={[0, 0, 0]}>
					<RoomModel />
				</group>
				<Environment preset="city" />
				<CameraRig stops={stops} index={step} onArrive={(ok) => ok && setArrived(true)} />
			</Canvas>
			<Overlay step={step} arrived={arrived} slides={slides} onWheelStep={next} />
		</div>
	)
}

useGLTF.preload('/models/room.glb')
