// src/components/home/hero/hero3d.jsx
// tabs indentation
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Knot from './knot.jsx'

import useIsMobile from './hooks/useIsMobile'
import useStartWhenVisible from './hooks/useStartWhenVisible'
import AnimatedName from './ui/animationName'
import HackerText from './ui/hackerText'

export default function Hero3D() {
	const isMobile = useIsMobile()
	const overlayRef = useRef(null)
	const start = useStartWhenVisible(overlayRef) // waits until overlay is actually visible & not covered

	return (
		<div id="hero" className="h-[80vh] relative">
			<Canvas camera={{ position: [0, 1.2, 4], fov: 55 }}>
				<ambientLight intensity={0.6} />
				<directionalLight position={[2, 4, 2]} intensity={1.1} />
				<Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
					<Knot />
				</Float>
				<Environment preset="city" />
				<OrbitControls enablePan={false} />
			</Canvas>

			{/* readability overlay */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

			{/* overlay text */}
			<div ref={overlayRef} className="absolute inset-0 flex items-center justify-center">
				<div className="text-center px-4">
					{/* Name + caret */}
					<div className="relative inline-flex items-center justify-center">
						<AnimatedName
							text="Baatyrbek"
							start={start}
							className="text-white font-bold leading-tight text-4xl sm:text-5xl"
						/>
						<span
							className={`ml-2 h-[1.4em] w-[2px] bg-white/90 rounded-sm animate-caret transition-opacity duration-300 ${start ? 'opacity-100' : 'opacity-0'}`}
						/>
					</div>

					{/* Underline */}
					<motion.div
						initial={{ width: 0, opacity: 0.6 }}
						animate={start ? { width: isMobile ? '70%' : '52%' } : { width: 0 }}
						transition={{ delay: 0.45, duration: 0.55, ease: 'easeOut' }}
						className="mx-auto mt-2 h-[2px] bg-white/40"
						style={{ willChange: 'width' }}
					/>

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 8 }}
						animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
						transition={{ delay: 0.35, duration: 0.4, ease: 'easeOut' }}
						className="mt-2 text-white/80 font-mono tracking-wider text-sm sm:text-base"
					>
						<HackerText text="SoftDev • WebDev • Data/ML" duration={isMobile ? 900 : 1200} start={start} />
					</motion.p>
				</div>
			</div>

			{/* caret blink keyframes */}
			<style>{`
				@keyframes caretBlink {
					0%, 45% { opacity: 1; }
					50%, 95% { opacity: 0; }
					100% { opacity: 1; }
				}
				.animate-caret { animation: caretBlink 1.1s steps(1) infinite; }
			`}</style>
		</div>
	)
}
