import React, { useMemo, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Navbar from '../components/home/utils/navbar'
import { getScene } from '../db/projectData'
import { CameraRig, Overlay, RoomModel, SceneLights } from '../components/projects'

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
				<SceneLights />
				<group position={[0, 0, 0]}>
					<RoomModel />
				</group>
				<CameraRig stops={stops} index={step} onArrive={(ok) => ok && setArrived(true)} />
			</Canvas>

			<Overlay step={step} arrived={arrived} slides={slides} onWheelStep={next} />
		</div>
	)
}
