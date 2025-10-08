// src/components/projects/overlay.jsx (a.k.a. ConnectedProjectsOverlay.jsx)
import React, { useEffect, useMemo, useRef } from "react"
import { useProjects } from "../../lib/useProjects"
import { motion, AnimatePresence } from "framer-motion"

function toSafeId(v, fb) {
	return (
		String(v ?? fb ?? '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
	) || String(fb ?? '')
}

/* ------------------------- PRESENTATIONAL OVERLAY ------------------------ */
export default function Overlay({ step, arrived, slides, onWheelStep }) {
	const containerRef = useRef(null)
	const cooldown = useRef(0)

	const len = Array.isArray(slides) ? slides.length : 0
	const safeIndex = len > 0 ? ((step % len) + len) % len : 0

	useEffect(() => {
		const el = containerRef.current
		if (!el || !len) return

		const onWheel = (e) => {
			e.preventDefault()
			const t = performance.now()
			if (t < cooldown.current) return
			const dir = Math.sign(e.deltaY)
			if (dir !== 0) {
				const atFirst = step <= 0
				const atLast = step >= len - 1
				let delta = 0
				if (dir > 0) delta = atLast ? -(len - 1) : 1
				else delta = atFirst ? (len - 1) : -1
				onWheelStep(delta)
				cooldown.current = t + 150
			}
		}

		el.addEventListener("wheel", onWheel, { passive: false })
		return () => el.removeEventListener("wheel", onWheel)
	}, [onWheelStep, step, len])

	const slide = len ? slides[safeIndex] : null

	const description = slide?.description ?? slide?.body ?? ""
	const skills = Array.isArray(slide?.skills) ? slide.skills : []
	const features = Array.isArray(slide?.features) ? slide.features : []
	const links = Array.isArray(slide?.links) ? slide.links : []

	return (
		<div ref={containerRef} className="pointer-events-auto absolute inset-0 grid place-items-center select-none">
			<div className="w-full max-w-3xl px-6">
				<div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-70 mb-1">
					<span className="font-semibold">Step {len ? safeIndex + 1 : 0} / {len}</span>
					<span className="font-semibold">Scroll to navigate</span>
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

export function ConnectedProjectsOverlay({
	step,
	arrived,
	onWheelStep,
	stopsLength,
	query = {},
	initialFocusKey = '',
	onResolveFocusIndex,
}) {
	const { data: projects, error } = useProjects({
		q: query.q,
		skill: query.skill,
		limit: query.limit,
		sort: query.sort,
	})

	const slides = useMemo(() => {
		const docs = Array.isArray(projects) ? projects : []
		const mapped = docs.map((p, i) => ({
			_id: p._id,
			id: p.id,
			slug: p.slug,
			title: p.title || "Untitled",
			description: p.description || "",
			associated: p.associated ?? null,
			dateLabel: p.dateLabel ?? null,
			skills: Array.isArray(p.skills) ? p.skills : [],
			features: Array.isArray(p.features) ? p.features : [],
			links: Array.isArray(p.links)
				? p.links.map((l) => ({ label: l.label, href: l.href }))
				: [],
			_match: [
				String(p.slug || '').toLowerCase(),
				String(p.id || '').toLowerCase(),
				String(p._id || '').toLowerCase(),
				String(p.title || '').toLowerCase(),
				toSafeId(p.title, `proj-${i+1}`),
			].filter(Boolean),
		}))
		return stopsLength > 0 ? mapped.slice(0, stopsLength) : mapped
	}, [projects, stopsLength])

	const didResolveRef = useRef(false)
	useEffect(() => {
		if (didResolveRef.current) return
		if (!slides.length) return
		const key = String(initialFocusKey || '').toLowerCase().trim()
		if (!key) return
		const idx = slides.findIndex(s => s._match?.some(m => m === key))
		if (idx >= 0) {
			didResolveRef.current = true
			onResolveFocusIndex?.(idx)
		}
	}, [slides, initialFocusKey, onResolveFocusIndex])

	return (
		<>
			{error && (
				<div className="absolute top-14 left-1/2 -translate-x-1/2 text-red-300 text-xs bg-red-900/30 px-2 py-1 rounded">
					Failed to load projects
				</div>
			)}

			<Overlay
				step={step}
				arrived={arrived}
				slides={slides}
				onWheelStep={onWheelStep}
			/>
		</>
	)
}
