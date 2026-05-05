// tabs only
import React, { useMemo } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useProjects } from "../lib/useProjects"
import { toSlug } from "../components/projects/slugify"
import { motion } from "framer-motion"

export default function ProjectDetails() {
	const { slug } = useParams()
	const navigate = useNavigate()
	const { data: all = [], error, isLoading } = useProjects({ limit: 100, sort: "-date" })

	const project = useMemo(() => {
		if (!slug || !all.length) return null
		let p = all.find((s) => toSlug(s?.title, s?._id) === slug)
		if (!p) p = all.find((s) => s?._id?.toString?.() === slug)
		return p ?? null
	}, [slug, all])

	if (isLoading) return <div className="min-h-[60vh] grid place-items-center opacity-70">Loading…</div>

	if (error) {
		return (
			<div className="max-w-3xl mx-auto px-4 py-10">
				<p className="text-red-400">Failed to load project.</p>
				<button onClick={() => navigate(-1)} className="underline opacity-80 hover:opacity-100">Go back</button>
			</div>
		)
	}

	if (!project) {
		return (
			<div className="max-w-3xl mx-auto px-4 py-10">
				<h1 className="text-2xl font-semibold mb-2">Project not found</h1>
				<p className="opacity-80 mb-6">No project for: <span className="font-mono">{slug}</span></p>
				<button onClick={() => navigate(-1)} className="inline-flex px-3 py-1.5 rounded border border-white/20 hover:bg-white/10">Go back</button>
			</div>
		)
	}

	const description = project?.description ?? project?.body ?? ""
	const skills = Array.isArray(project?.skills) ? project.skills : []
	const features = Array.isArray(project?.features) ? project.features : []
	const links = Array.isArray(project?.links) ? project.links : []

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-4">
				<button onClick={() => navigate(-1)} className="inline-flex text-sm opacity-80 hover:opacity-100">← Back</button>
				<Link to="/projects" className="inline-flex text-sm opacity-70 hover:opacity-100">All projects</Link>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className="rounded-2xl p-5 backdrop-blur bg-black/20 border border-white/10 shadow-xl"
			>
				<h1 className="text-3xl font-semibold mb-2">{project.title}</h1>

				{(project.dateLabel || project.associated) && (
					<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80 mb-4">
						{project.dateLabel && <span className="whitespace-nowrap">{project.dateLabel}</span>}
						{project.dateLabel && project.associated && <span className="opacity-50">•</span>}
						{project.associated && <span className="whitespace-nowrap">{project.associated}</span>}
					</div>
				)}

				{description && <p className="text-base leading-relaxed opacity-90 mb-4">{description}</p>}

				{skills.length > 0 && (
					<div className="mb-4">
						<div className="text-xs uppercase tracking-widest opacity-70 mb-2">Skills</div>
						<div className="flex flex-wrap gap-2">
							{skills.map((s, i) => (
								<span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">{s}</span>
							))}
						</div>
					</div>
				)}

				{features.length > 0 && (
					<div className="mb-4">
						<div className="text-xs uppercase tracking-widest opacity-70 mb-2">Features</div>
						<ul className="list-disc list-inside space-y-1 text-base opacity-90">
							{features.map((f, i) => (<li key={i}>{f}</li>))}
						</ul>
					</div>
				)}

				{links.length > 0 && (
					<div className="pt-2 flex flex-wrap gap-2">
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
		</div>
	)
}
