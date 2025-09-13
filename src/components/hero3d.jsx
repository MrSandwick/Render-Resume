// src/components/Hero3D.jsx (only change is wrapping <Knot />)
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import Knot from './knot.jsx'

export default function Hero3D() {
	return (
		<div className="h-[60vh] relative">
			<Canvas camera={{ position: [0, 1.2, 4], fov: 55 }}>
				<ambientLight intensity={0.6} />
				<directionalLight position={[2, 4, 2]} intensity={1.1} />
				<Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
					<Knot />
				</Float>
				<Environment preset="city" />
				<OrbitControls enablePan={false} />
			</Canvas>

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="text-center px-4">
					<h1 className="text-4xl font-bold">Baatyrbek</h1>
					<p className="opacity-80">SoftDev • WebDev • Data/ML</p>
				</div>
			</div>
		</div>
	)
}
