// tabs indentation
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useMemo, useEffect } from 'react'
import { Decal, useTexture, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function SpinBall({ color = '#ffffff', icon, decalScale = 0.9 }) {
	const ref = useRef()
	const tex = useTexture(icon) // e.g. '/icons/react.png'

	// make small PNGs look crisp
	useMemo(() => {
		if (!tex) return
		tex.anisotropy = 8
		tex.minFilter = THREE.LinearMipMapLinearFilter
		tex.magFilter = THREE.LinearFilter
		tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
	}, [tex])

	// subtle idle wiggle
	const phaseX = useRef(Math.random() * Math.PI * 2)
	const phaseY = useRef(Math.random() * Math.PI * 2)
	const ampX = useRef(0.1 + Math.random() * 0.15)
	const ampY = useRef(0.1 + Math.random() * 0.15)

	useFrame((state) => {
		if (!ref.current) return
		const t = state.clock.getElapsedTime()
		const speed = 1.5
		ref.current.rotation.x = Math.sin(t * speed + phaseX.current) * ampX.current
		ref.current.rotation.y = Math.sin(t * speed + phaseY.current) * ampY.current
	})

	return (
		<mesh ref={ref} castShadow receiveShadow>
			<icosahedronGeometry args={[1, 1]} />
			<meshStandardMaterial color={color} flatShading />
			{icon && (
				<Decal
					position={[0, 0, 0.92]}
					rotation={[0, 0, 0]}
					scale={[decalScale, decalScale, decalScale]}
					map={tex}
					polygonOffset
					polygonOffsetFactor={-1}
				/>
			)}
		</mesh>
	)
}

/* Smooth recenter: lerp theta/phi back to initial, keep radius constant */
function RecenterOnEnd({ controlsRef, speed = 6, eps = 1e-3 }) {
	const { camera } = useThree()
	const initial = useRef({
		target: new THREE.Vector3(0, 0, 0),
		spherical: new THREE.Spherical(), // r, phi, theta
	})
	const working = {
		offset: new THREE.Vector3(),
		curr: new THREE.Spherical(),
	}
	const recenter = useRef(false)

	useEffect(() => {
		const ctrls = controlsRef.current
		if (!ctrls) return
		// snapshot initial orientation after first tick
		const offset = working.offset
		offset.copy(camera.position).sub(ctrls.target)
		initial.current.spherical.setFromVector3(offset)
		initial.current.target.copy(ctrls.target)

		const onStart = () => {
			recenter.current = false
			if (ctrls.domElement) ctrls.domElement.style.cursor = 'grabbing'
		}
		const onEnd = () => {
			recenter.current = true
			if (ctrls.domElement) ctrls.domElement.style.cursor = 'grab'
		}
		ctrls.addEventListener('start', onStart)
		ctrls.addEventListener('end', onEnd)
		return () => {
			ctrls.removeEventListener('start', onStart)
			ctrls.removeEventListener('end', onEnd)
		}
		// eslint-disable-next-line
	}, [])

	useFrame((_, delta) => {
		const ctrls = controlsRef.current
		if (!ctrls || !recenter.current) return

		// compute current spherical relative to current target
		const offset = working.offset.copy(camera.position).sub(ctrls.target)
		working.curr.setFromVector3(offset)

		// exponential smoothing factor
		const a = 1 - Math.exp(-speed * delta)

		// lerp angles to initial (small ranges thanks to azimuth limits → no wrap issues)
		working.curr.theta = THREE.MathUtils.lerp(working.curr.theta, initial.current.spherical.theta, a)
		working.curr.phi = THREE.MathUtils.lerp(working.curr.phi, initial.current.spherical.phi, a)

		// keep constant radius
		working.curr.radius = initial.current.spherical.radius

		// lerp target too (usually 0,0,0)
		ctrls.target.lerp(initial.current.target, a)

		// rebuild camera position from spherical + target
		offset.setFromSpherical(working.curr)
		camera.position.copy(ctrls.target).add(offset)
		ctrls.update()

		const doneAngles =
			Math.abs(working.curr.theta - initial.current.spherical.theta) < eps &&
			Math.abs(working.curr.phi - initial.current.spherical.phi) < eps
		const doneTarget = ctrls.target.distanceToSquared(initial.current.target) < eps * eps

		if (doneAngles && doneTarget) {
			// snap to exact to avoid drift
			ctrls.target.copy(initial.current.target)
			offset.setFromSpherical(initial.current.spherical)
			camera.position.copy(ctrls.target).add(offset)
			ctrls.update()
			recenter.current = false
		}
	})

	return null
}

export default function ShapeCanvas({ color = '#1f2937', icon, decalScale }) {
	const controlsRef = useRef()

	return (
		<Canvas
			camera={{ position: [0, 0, 3.2], fov: 50 }}
			gl={{ antialias: true, alpha: true }}
			style={{ width: '100%', height: '100%', background: 'transparent', cursor: 'grab' }}
			shadows
		>
			<ambientLight intensity={0.6} />
			<directionalLight position={[3, 4, 2]} intensity={1.2} />

			<Suspense fallback={null}>
				<SpinBall color={color} icon={icon} decalScale={decalScale} />
			</Suspense>

			{/* Orbit with restricted range so users can’t go “behind” the ball */}
			<OrbitControls
				ref={controlsRef}
				enableZoom={false}
				enablePan={false}
				enableDamping
				dampingFactor={0.12}
				rotateSpeed={0.9}
				minPolarAngle={THREE.MathUtils.degToRad(35)}   // ~35°
				maxPolarAngle={THREE.MathUtils.degToRad(145)}  // ~145°
				minAzimuthAngle={THREE.MathUtils.degToRad(-60)} // -60°
				maxAzimuthAngle={THREE.MathUtils.degToRad(60)}  // +60°
			/>

			{/* Smooth return to initial view when drag ends (constant distance → no “size jump”) */}
			<RecenterOnEnd controlsRef={controlsRef} speed={6} />
		</Canvas>
	)
}