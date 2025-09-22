import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Overlay({ step, arrived, slides, onWheelStep }) {
	const containerRef = useRef(null)
	const cooldown = useRef(0)

	// Compute a safe wrapped index for rendering, regardless of parent bounds
	const len = Array.isArray(slides) ? slides.length : 0
	const safeIndex = len > 0 ? ((step % len) + len) % len : 0

	useEffect(() => {
		const el = containerRef.current
		if (!el || !len) return

		const onWheel = (e) => {
			e.preventDefault()
			const t = performance.now()
			if (t < cooldown.current) return

			// direction of scroll: +1 forward, -1 backward
			const dir = Math.sign(e.deltaY)

			// Infinite wrap deltas:
			// - When at the last slide and scrolling forward, jump to first with delta = -(len-1)
			// - When at the first slide and scrolling backward, jump to last with delta = +(len-1)
			// - Otherwise, move by ±1 as usual
			if (dir !== 0) {
				const atFirst = step <= 0
				const atLast = step >= len - 1

				let delta = 0
				if (dir > 0) {
					delta = atLast ? -(len - 1) : 1
				} else {
					delta = atFirst ? (len - 1) : -1
				}

				onWheelStep(delta)
				cooldown.current = t + 150
			}
		}

		el.addEventListener('wheel', onWheel, { passive: false })
		return () => el.removeEventListener('wheel', onWheel)
		// Depend on step/len to always compute correct wrap behavior at edges
	}, [onWheelStep, step, len])

	const slide = len ? slides[safeIndex] : null

	// graceful fallback if old shape `{ body }` is passed
	const description = slide?.description ?? slide?.body ?? ''
	const skills = Array.isArray(slide?.skills) ? slide.skills : []
	const features = Array.isArray(slide?.features) ? slide.features : []
	const links = Array.isArray(slide?.links) ? slide.links : []

	return (
		<div ref={containerRef} className="pointer-events-auto absolute inset-0 grid place-items-center select-none">
			<div className="w-full max-w-3xl px-6">
				<div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-70 mb-3">
					<span className='font-semibold'>Step {len ? safeIndex + 1 : 0} / {len}</span>
					<span className='font-semibold'>Scroll to navigate</span>
				</div>

				<AnimatePresence mode="popLayout">
					{arrived && slide && (
						<motion.div
							key={slide.id ?? safeIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							className="rounded-2xl p-6 backdrop-blur bg-black/20 border border-white/10 shadow-xl"
						>
							{/* Title */}
							<h2 className="text-2xl md:text-3xl font-semibold mb-2">
								{slide.title}
							</h2>

							{/* Meta row: date • associated */}
							{(slide.dateLabel || slide.associated) && (
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-white/80 mb-3">
									{slide.dateLabel && <span className="whitespace-nowrap">{slide.dateLabel}</span>}
									{slide.dateLabel && slide.associated && <span className="opacity-50">•</span>}
									{slide.associated && <span className="whitespace-nowrap">{slide.associated}</span>}
								</div>
							)}

							{/* Description */}
							{description && (
								<p className="text-sm md:text-base leading-relaxed opacity-90 mb-2">
									{description}
								</p>
							)}

							{/* Skills */}
							{skills.length > 0 && (
								<div className="mb-2">
									<div className="text-xs uppercase tracking-widest opacity-70 mb-2">Skills</div>
									<div className="flex flex-wrap gap-2">
										{skills.map((s, i) => (
											<span
												key={i}
												className="text-xs md:text-sm px-2 py-1 rounded-full bg-white/10 border border-white/10"
											>
												{s}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Features */}
							{features.length > 0 && (
								<div className="">
									<div className="text-xs uppercase tracking-widest opacity-70">Features</div>
									<ul className="list-disc list-inside space-y-1 text-sm md:text-base opacity-90">
										{features.map((f, i) => (
											<li className='m-0' key={i}>{f}</li>
										))}
									</ul>
								</div>
							)}

							{/* Links */}
							{links.length > 0 && (
								<div className="pt-2 flex flex-wrap gap-3">
									{links.map((l, i) => (
										<a
											key={i}
											href={l.href}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center text-sm px-3 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 transition"
										>
											<span className="i-lucide-link-2" aria-hidden />
											{l.label}
										</a>
									))}
								</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
