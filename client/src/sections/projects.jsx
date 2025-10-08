// src/components/projects/Projects.jsx
import React, { useEffect, useMemo, useState } from 'react'

const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
const API_URL = `${BASE}/api/projects`

const FEATURED = [
	'agripredict',
	'commercial-product-website',
	'car-dealership-network',
	'user-group-script',
	'gittool-c',
	'network-monitor-python',
]

function pickArray(json) {
	if (Array.isArray(json)) return json
	if (Array.isArray(json?.data)) return json.data
	if (Array.isArray(json?.projects)) return json.projects
	if (Array.isArray(json?.items)) return json.items
	if (Array.isArray(json?.results)) return json.results
	if (Array.isArray(json?.data?.items)) return json.data.items
	return []
}

function toSafeId(v, fb) {
	return (
		String(v ?? fb ?? '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
	) || String(fb ?? '')
}

function Skeleton() {
	return (
		<div className="rounded-xl border border-white/10 bg-white/5 p-4">
			<div className="h-5 w-2/3 bg-white/10 rounded mb-3 animate-pulse" />
			<div className="h-4 w-full bg-white/10 rounded mb-2 animate-pulse" />
			<div className="h-4 w-5/6 bg-white/10 rounded animate-pulse" />
		</div>
	)
}

function ProjectCard({ title, desc, href }) {
	return (
		<a
			href={href}
			className="group block rounded-xl border border-white/10 bg-white/5 p-5 transition
			        	hover:bg-white/10 hover:border-white/20 hover:shadow-md
			        	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
		>
			<div className="flex items-start gap-3">
				<div className="flex-1">
					<h3 className="text-lg font-semibold">{title}</h3>
					{desc && <p className="mt-1 text-sm text-white/85 leading-relaxed">{desc}</p>}
				</div>
				<svg
					width="20" height="20" viewBox="0 0 24 24" fill="none"
					className="mt-1 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-45"
				>
					<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			</div>
		</a>
	)
}

export default function Projects() {
	const [rows, setRows] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const MAX = 6

	useEffect(() => {
		let canceled = false
		;(async () => {
			try {
				setLoading(true)
				setError(null)
				const res = await fetch(API_URL, { headers: { Accept: 'application/json' } })
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				const json = await res.json()
				if (canceled) return
				setRows(pickArray(json))
			} catch (e) {
				if (!canceled) setError(e?.message || 'Failed to load')
			} finally {
				if (!canceled) setLoading(false)
			}
		})()
		return () => { canceled = true }
	}, [])

	const mapped = useMemo(() => rows.map((r, i) => {
		const keyBase = r?.slug || r?.id || r?._id || toSafeId(r?.title, `proj-${i + 1}`)
		const focus = encodeURIComponent(String(keyBase).toLowerCase())
		const href = `/projects?focus=${focus}`

		const matchKeys = [
			String(r?.slug || '').toLowerCase(),
			String(r?.id || '').toLowerCase(),
			String(r?._id || '').toLowerCase(),
			String(r?.title || '').toLowerCase(),
		].filter(Boolean)

		return {
			key: String(keyBase),
			title: r?.title || r?.name || 'Untitled',
			desc: r?.description ?? r?.body ?? r?.desc ?? '',
			href,
			matchKeys,
		}
	}), [rows])

	const featuredSet = new Set(FEATURED.map(s => s.toLowerCase()))
	const featuredOrder = new Map(FEATURED.map((s, i) => [s.toLowerCase(), i]))

	const featured = FEATURED.length
		? mapped
			.filter(item => item.matchKeys.some(k => featuredSet.has(k)))
			.sort((a, b) => {
				const ia = a.matchKeys.map(k => featuredOrder.get(k)).find(n => n !== undefined)
				const ib = b.matchKeys.map(k => featuredOrder.get(k)).find(n => n !== undefined)
				return (ia ?? 1e9) - (ib ?? 1e9)
			})
		: []

	const items = (featured.length ? featured : mapped).slice(0, MAX)

	return (
		<section
			className="max-w-5xl mx-auto px-4 pb-12 text-white
			[&_a]:!text-white [&_a:hover]:!text-white [&_a:focus]:!text-white [&_a:visited]:!text-white"
		>
			<h2 className="text-2xl font-semibold mb-6">Projects</h2>

			{loading && (
				<div className="grid gap-4 sm:grid-cols-2">
					{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)}
				</div>
			)}

			{!loading && error && <div className="text-sm text-red-300">Couldn’t load projects: {error}</div>}
			{!loading && !error && !items.length && <div className="text-sm opacity-70">No projects found.</div>}

			{!loading && !error && items.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2">
					{items.map((p) => (
						<ProjectCard key={p.key} title={p.title} desc={p.desc} href={p.href} />
					))}
				</div>
			)}

			<div className="mt-6 flex justify-end">
				<a
					href="/projects"
					className="inline-flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100
					        	border border-white/10 rounded-xl px-4 py-2 bg-white/5 hover:bg-white/10 transition"
					aria-label="View all projects"
				>
					<span>View all</span>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-white/90">
						<path d="M5 12h14M13 5l7 7-7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</a>
			</div>
		</section>
	)
}
