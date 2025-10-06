import React from 'react'
import { scenes } from '../db/projectData'

export default function Projects() {
	const projectsData = scenes?.roomTour?.slides ?? []

	// choose max items
	const MAX = 4

	// simple selector to pick best href per project
	const pickHref = (slide) => {
		const links = Array.isArray(slide?.links) ? slide.links : []
		const github = links.find(l => /github/i.test(l.label || '') || /github\.com/i.test(l.href || ''))
		
		// prefer GitHub; otherwise route to the Projects page 
		if (github?.href) return github.href
		return `/projects#${slide?.id || ''}`
	}


	// derive a lightweight list for the UI
	const projects = projectsData.map(s => ({
		key: s.id || s.title,
		title: s.title,
		desc: s.description || s.body || '',
		href: pickHref(s),
	}))

	const visible = projects.slice(0, MAX)

	return (
		<section
			id="projects"
			className="max-w-5xl mx-auto px-4 pb-12 text-white
			[&_a]:!text-white [&_a:hover]:!text-white [&_a:focus]:!text-white [&_a:visited]:!text-white"
		>
			<h2 className="text-2xl font-semibold mb-6">Projects</h2>

			<div className="grid gap-4">
				{visible.map((p) => (
					<a
						key={p.key}
						className="block border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition"
						href={p.href}
						target={/^https?:\/\//i.test(p.href) ? '_blank' : undefined}
						rel={/^https?:\/\//i.test(p.href) ? 'noreferrer' : undefined}
					>
						<div className="font-medium">{p.title}</div>
						<div className="text-sm opacity-80">{p.desc}</div>
					</a>
				))}
			</div>

			<div className="mt-4 flex justify-end">
				<a
					href="/projects"
					className="inline-flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100"
					aria-label="View all projects"
				>
					<span>View all</span>
					<span aria-hidden>→</span>
				</a>
			</div>
		</section>
	)
}
