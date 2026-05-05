// src/components/projects/overlay.jsx (ConnectedProjectsOverlay.jsx)
import React, { useEffect, useMemo, useRef } from "react"
import { useProjects } from "../../lib/useProjects"
import { motion, AnimatePresence } from "framer-motion"

/* ------------------------------- UTILITIES ------------------------------ */
export function toSafeId(v, fb) {
	return (
		String(v ?? fb ?? "")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-+|-+$/g, "")
	) || String(fb ?? "")
}

/* ------------------------- PRESENTATIONAL OVERLAY ------------------------ */
export default function Overlay({ step, arrived, slides, onWheelStep, stopsLength }) {
	const containerRef = useRef(null)
	const cooldown = useRef(0)

	const len = Array.isArray(slides) ? slides.length : 0
	const effectiveLen = stopsLength ? Math.min(len, stopsLength) : len
	const safeIndex = effectiveLen > 0 ? ((step % effectiveLen) + effectiveLen) % effectiveLen : 0

	useEffect(() => {
		const el = containerRef.current
		if (!el || !effectiveLen) return

		const COOLDOWN_MS = 150
		const now = () => performance.now()

		const onWheel = (e) => {
			e.preventDefault()
			const t = now()
			if (t < cooldown.current) return
			const dir = Math.sign(e.deltaY)
			if (!dir) return

			const atFirst = step <= 0
			const atLast = step >= effectiveLen - 1
			let delta = 0
			if (dir > 0) delta = atLast ? -(effectiveLen - 1) : 1
			else delta = atFirst ? (effectiveLen - 1) : -1

			onWheelStep(delta)
			cooldown.current = t + COOLDOWN_MS
		}

		const SWIPE_THRESHOLD = 28
		let startX = 0, startY = 0, tookOver = false, active = false

		const onTouchStart = (e) => {
			if (e.touches?.length !== 1) return
			const { clientX, clientY } = e.touches[0]
			startX = clientX
			startY = clientY
			tookOver = false
			active = true
		}

		const onTouchMove = (e) => {
			if (!active) return
			const { clientX, clientY } = e.touches[0]
			const dx = clientX - startX
			const dy = clientY - startY
			if (!tookOver && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > SWIPE_THRESHOLD) {
				e.preventDefault()
				tookOver = true
			}
		}

		const onTouchEnd = (e) => {
			if (!active) return
			active = false
			if (!tookOver) return

			const t = now()
			if (t < cooldown.current) return

			const touch = e.changedTouches?.[0]
			const endY = touch ? touch.clientY : startY
			const dy = endY - startY

			if (Math.abs(dy) >= SWIPE_THRESHOLD) {
				const dir = Math.sign(-dy)
				const atFirst = step <= 0
				const atLast = step >= effectiveLen - 1
				let delta = 0
				if (dir > 0) delta = atLast ? -(effectiveLen - 1) : 1
				else if (dir < 0) delta = atFirst ? (effectiveLen - 1) : -1

				if (delta !== 0) {
					onWheelStep(delta)
					cooldown.current = t + COOLDOWN_MS
				}
			}
		}

		el.addEventListener("wheel", onWheel, { passive: false })
		el.addEventListener("touchstart", onTouchStart, { passive: true })
		el.addEventListener("touchmove", onTouchMove, { passive: false })
		el.addEventListener("touchend", onTouchEnd, { passive: true })

		return () => {
			el.removeEventListener("wheel", onWheel)
			el.removeEventListener("touchstart", onTouchStart)
			el.removeEventListener("touchmove", onTouchMove)
			el.removeEventListener("touchend", onTouchEnd)
		}
	}, [onWheelStep, step, effectiveLen])

	const slide = len ? slides[safeIndex] : null

	const description = slide?.description ?? slide?.body ?? ""
	const skills = Array.isArray(slide?.skills) ? slide.skills : []
	const features = Array.isArray(slide?.features) ? slide.features : []
	const links = Array.isArray(slide?.links) ? slide.links : []

	return (
		<div
			ref={containerRef}
			className="pointer-events-auto absolute inset-0 grid place-items-center select-none"
			style={{ touchAction: "none" }}
		>
			<div className="w-full max-w-3xl px-6">
				<div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-70 mb-1">
					<span className="font-semibold">Step {effectiveLen ? safeIndex + 1 : 0} / {effectiveLen}</span>
					<span className="font-semibold">Scroll / Swipe to navigate</span>
				</div>

				<AnimatePresence mode="popLayout">
					{arrived && slide && (
						<motion.div
							key={safeIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="rounded-2xl p-5 backdrop-blur bg-black/20 border border-white/10 shadow-xl"
						>
							<h2 className="text-2xl md:text-3xl font-semibold mb-2">{slide.title}</h2>

							{(slide.dateLabel || slide.associated) && (
								<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs md:text-sm text-white/80 mb-3">
									{slide.dateLabel && <span className="whitespace-nowrap">{slide.dateLabel}</span>}
									{slide.dateLabel && slide.associated && <span className="opacity-50">•</span>}
									{slide.associated && <span className="whitespace-nowrap">{slide.associated}</span>}
								</div>
							)}

							{description && (
								<p className="text-sm md:text-base leading-relaxed opacity-90 mb-2">{description}</p>
							)}

							{skills.length > 0 && (
								<div className="mb-2">
									<div className="text-xs uppercase tracking-widest opacity-70 mb-2">Skills</div>
									<div className="flex flex-wrap gap-2">
										{skills.map((s, i) => (
											<span key={i} className="text-xs md:text-sm px-2 py-1 rounded-full bg-white/10 border border-white/10">
												{s}
											</span>
										))}
									</div>
								</div>
							)}

							{features.length > 0 && (
								<div>
									<div className="text-xs uppercase tracking-widest opacity-70">Features</div>
									<ul className="list-disc list-inside space-y-1 text-sm md:text-base opacity-90">
										{features.map((f, i) => (<li className="m-0" key={i}>{f}</li>))}
									</ul>
								</div>
							)}

							{links.length > 0 && (
								<div className="pt-3 flex flex-wrap gap-2">
									{links.map((l, i) => (
										<a
											key={i}
											href={l.href}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 transition"
											title={l.href}
										>
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

/* ----------------------- CONNECTED (API ONLY) ---------------------- */
export function ConnectedProjectsOverlay({
	step,
	arrived,
	onWheelStep,
	stopsLength,
	query = {},
	initialFocusKey = "",
	onResolveFocusIndex,
}) {
	const { data: slides = [], error } = useProjects({
		q: query.q,
		skill: query.skill,
		limit: query.limit,
		sort: query.sort,
	})

	const didResolveRef = useRef(false)
	useEffect(() => {
		if (didResolveRef.current) return
		if (!slides.length) return
		const key = String(initialFocusKey || "").toLowerCase().trim()
		if (!key) return
		const idx = slides.findIndex((s) => {
			const candidates = [s?._id, s?.slug, s?.id, s?.title, toSafeId(s?.title)]
				.filter(Boolean)
				.map((v) => String(v).toLowerCase())
			return candidates.includes(key)
		})
		if (idx >= 0) {
			didResolveRef.current = true
			onResolveFocusIndex?.(idx)
		}
	}, [slides, initialFocusKey, onResolveFocusIndex])

	return (
		<Overlay
			step={step}
			arrived={arrived}
			slides={slides}
			onWheelStep={onWheelStep}
			stopsLength={stopsLength}
		/>
	)
}
