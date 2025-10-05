// src/components/TechStack.jsx
import { useEffect, useMemo, useState } from "react"

export default function TechStack() {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const [selected, setSelected] = useState("All")

	// 1) Fetch from API
	useEffect(() => {
		let live = true
		;(async () => {
			try {
				setLoading(true)
				setError("")
				const base = import.meta.env.VITE_API_URL || ""
				const res = await fetch(`${base}/api/skills`)
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				const data = await res.json()
				if (live) {
					console.log("skills loaded:", data.length, data.slice(0, 3))
					setItems(Array.isArray(data) ? data : [])
				}
			} catch (e) {
				if (live) setError(e.message || "Failed to load skills")
			} finally {
				if (live) setLoading(false)
			}
		})()
		return () => { live = false }
	}, [])

	// 2) Build categories dynamically from DB (+ All)
	const categories = useMemo(() => {
		const set = new Set(items.map(s => s.category).filter(Boolean))
		return ["All", ...Array.from(set).sort()]
	}, [items])

	// 3) Your DOM-based filter (unchanged), but ensure “All” is applied on data load
	const onClick = (cat) => {
		setSelected(cat)
		const root = document.getElementById("cards")
		if (!root) return
		root.setAttribute("data-category", cat)
		for (const el of root.children) {
			const c = el.getAttribute("data-cat")
			const show = (cat === "All" || c === cat)
			el.classList.toggle("hidden", !show)
		}
	}

	// Force-apply "All" once items appear to avoid a stuck-hidden state
	useEffect(() => {
		if (!loading && !error) onClick("All")
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, error, items.length])

	return (
		<section id="tech" className="relative z-10 max-w-7xl mx-auto px-6 py-12">
			{/* Controls */}
			<div className="flex flex-wrap items-center gap-2 mb-6">
				{categories.map((c) => (
					<button
						key={c}
						type="button"
						onClick={() => onClick(c)}
						className={`px-3 py-1.5 rounded-xl border text-sm transition ${
							selected === c
								? "border-white/30 bg-white/10"
								: "border-white/10 bg-white/5 hover:bg-white/10"
						}`}
					>
						{c}
					</button>
				))}
				<span className="ml-auto text-xs opacity-70">
					{loading ? "Loading…" : `${items.length} skills`}
				</span>
			</div>

			{/* Loading */}
			{loading && (
				<div className="flex flex-wrap gap-6">
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className="basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] xl:basis-[calc(25%-1rem)] grow h-28 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
						/>
					))}
				</div>
			)}

			{/* Error */}
			{!loading && error && (
				<div className="p-4 rounded-xl border border-red-500/30 bg-red-950/30">
					<p className="font-semibold">Failed to load skills</p>
					<p className="text-sm opacity-80">{error}</p>
				</div>
			)}

			{/* Cards */}
			{!loading && !error && (
				<div id="cards" className="flex flex-wrap gap-6" data-category="All">
					{items.map((t) => (
						<Card
							key={t._id || t.name}
							name={t.name}
							category={t.category}
							desc={t.desc}
							icon={t.icon}
						/>
					))}
					{items.length === 0 && (
						<p className="opacity-70">No skills found.</p>
					)}
				</div>
			)}
		</section>
	)
}

function Card({ name, category, desc, icon }) {
	return (
		<article
			data-cat={category}
			className="basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] xl:basis-[calc(25%-1rem)] grow rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5 backdrop-blur"
		>
			<header className="flex items-center gap-3 mb-3">
				<div className="text-2xl">{icon || "🛠️"}</div>
				<div>
					<h3 className="font-semibold text-left">{name}</h3>
					{desc && <p className="text-sm opacity-80 text-left">{desc}</p>}
				</div>
			</header>
			<p className="text-xs opacity-60">{category}</p>
		</article>
	)
}
