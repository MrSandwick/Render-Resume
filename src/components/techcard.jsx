import { TECH_ITEMS as items, TECH_CATEGORIES as categories } from "../db/tech.js";

export default function TechStack() {
	const onClick = (cat) => {
		const root = document.getElementById("cards");
		if (!root) return;
		root.setAttribute("data-category", cat);
		for (const el of root.children) {
			const c = el.getAttribute("data-cat");
			const show = (cat === "All" || c === cat);
			el.classList.toggle("hidden", !show);
		}
	};

	return (
		<section id="tech" className="relative z-10 max-w-7xl mx-auto px-6 py-12">
			<div className="flex flex-wrap gap-2 mb-6">
				{categories.map((c) => (
					<button
						key={c}
						type="button"
						onClick={() => onClick(c)}
						className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm transition"
					>
						{c}
					</button>
				))}
			</div>

			<div id="cards" className="flex flex-wrap gap-6" data-category="All">
				{items.map((t) => (
					<Card key={t.name} {...t} />
				))}
			</div>
		</section>
	);
}

function Card({ name, category, desc, icon }) {
	return (
		<article
			data-cat={category}
			className="basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)] xl:basis-[calc(25%-1rem)] grow rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5 backdrop-blur"
		>
			<header className="flex items-center gap-3 mb-3">
				<div className="text-2xl">{icon}</div>
				<div>
					<h3 className="font-semibold text-left">{name}</h3>
					<p className="text-sm opacity-80 text-left">{desc}</p>
				</div>
			</header>
			<p className="text-xs opacity-60">{category}</p>
		</article>
	);
}
