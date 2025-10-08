// src/pages/RoomShowcase.jsx
import React, { useMemo, useState, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import Navbar from "../components/home/utils/navbar.jsx"
import { CameraRig, RoomModel, SceneLights } from "../components/projects/index.jsx"
import { ConnectedProjectsOverlay } from "../components/projects/overlay.jsx"
import { getScene } from "../db/projectData.js"   // ✅ import from JS module
import GlobalLoader from '/src/components/comm/loader.jsx'

export default function RoomShowcase() {
	const { stops } = useMemo(() => getScene("roomTour"), [])   // ✅ no stopsData var

	const [step, setStep] = useState(0)
	const [arrived, setArrived] = useState(true)

	const next = useCallback((dir) => {
		setArrived(false)
		setStep((s) => Math.max(0, Math.min(stops.length - 1, s + dir)))
	}, [stops.length])

	return (
		<div className="relative h-screen w-full text-white overflow-hidden">
			<GlobalLoader />
			<Navbar />
			<Canvas dpr={[1, 2]} camera={{ fov: 45, near: 0.1, far: 100000 }} gl={{ antialias: true, alpha: true }}>
				<SceneLights />
				<group position={[0, 0, 0]}>
					<RoomModel />
				</group>
				<CameraRig stops={stops} index={step} onArrive={(ok) => ok && setArrived(true)} />
			</Canvas>

			<ConnectedProjectsOverlay
				step={step}
				arrived={arrived}
				onWheelStep={next}
				stopsLength={stops.length}
			/>
		</div>
	)
}
