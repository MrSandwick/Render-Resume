import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Overlay({ step, arrived, slides, onWheelStep }) {
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
		return () => el.removeEventListener('wheel', onWheel)
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
