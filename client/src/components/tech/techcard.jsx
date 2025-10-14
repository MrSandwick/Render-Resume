// src/components/TechStack.jsx
import { useEffect, useMemo, useState } from "react"
import { useSkills } from "../../lib/useSkills"

export default function TechStack() {
	const { data: list = [], error, loading } = useSkills()
	const [selected, setSelected] = useState("All")

	// Categories derived directly from API data
	const categories = useMemo(() => {
		const cats = new Set(list.map((t) => t.category).filter(Boolean))
		return ["All", ...cats]
	}, [list])

	// DOM-based filter
	const onClick = (cat) => {
		setSelected(cat)
		const root = document.getElementById("cards")
		if (!root) return
		root.setAttribute("data-category", cat)
		for (const el of root.children) {
			const c = el.getAttribute("data-cat")
			const show = cat === "All" || c === cat
			el.classList.toggle("hidden", !show)
		}
	}

	// Ensure "All" filter is applied once content is ready
	useEffect(() => {
		if (!loading) onClick("All")
	}, [loading, list.length])

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
					{loading ? "Loading…" : `${list.length} skills`}
				</span>
			</div>

			{/* Loading */}
			{loading && (
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className="h-28 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
						/>
					))}
				</div>
			)}

			{/* Error note */}
			{!loading && error && (
				<div className="p-4 mb-4 rounded-xl border border-red-500/30 bg-red-950/30">
					<p className="text-sm opacity-80">Failed to load skills.</p>
				</div>
			)}

			{/* Cards */}
			{!loading && (
				<div
					id="cards"
					data-category="All"
					className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
				>
					{list.map((t) => (
						<Card
							key={t._id || t.name}
							name={t.name}
							category={t.category}
							desc={t.desc}
							icon={t.icon}
						/>
					))}
				</div>
			)}
		</section>
	)
}

function Card({ name, category, desc, icon }) {
	return (
		<article
			data-cat={category}
			className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5 backdrop-blur"
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
