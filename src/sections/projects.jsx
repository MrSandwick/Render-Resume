export default function Projects() {
	return (
		<section id="projects" className="max-w-5xl mx-auto px-4 pb-12">
			<h2 className="text-2xl font-semibold mb-3">Projects</h2>

			<a
				className="block border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition"
				href="https://github.com/your-username/your-project"
				target="_blank"
				rel="noreferrer"
			>
				<div className="font-medium">Project Name</div>
				<div className="text-sm opacity-80">One-line what it does + tech.</div>
			</a>
		</section>
	)
}
