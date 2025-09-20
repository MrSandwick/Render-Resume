export default function Projects() {
	const projects = [
		{
			title: "AgriPredict",
			desc: "Analyzed crop data with EDA + regression (NumPy, Pandas, Matplotlib, Scikit-Learn)",
			href: "https://github.com/MrSandwick/AgriAnalysis",
		},
		{
			title: "Car Dealership Network Security & Infrastructure",
			desc: "Designed secure network (Cisco Packet Tracer, VLANs, Firewall Rules)",
		},
		{
			title: "Commercial Product Website",
			desc: "Responsive storefront UI (HTML, CSS, SCSS, JavaScript)",
		},
		{
			title: "File Sorter",
			desc: "Java program auto-sorts files by name patterns",
		},
		{
			title: "Network Adapter Information Tool",
			desc: "C + Windows API utility listing network interfaces and stats",
			href: "https://github.com/MrSandwick/Net-Adapter-InfoTool",
		},
		{
			title: "Network Monitor",
			desc: "Python tool for network health monitoring & alerts",
			href: "https://github.com/MrSandwick/-Auto-Net.-Health-Monitor",
		},
		{
			title: "Quiz Game",
			desc: "Java console quiz game with scoring & replay",
		},
		{
			title: "User & Group Creation Script",
			desc: "Linux Bash script for automated user/group setup",
		},
		{
			title: "gitTool",
			desc: "C-based CLI tool automating Git tasks",
			href: "https://github.com/MrSandwick/gitTool",
		},
	]

	const MAX = 4
	const visible = projects.slice(0, MAX)

	return (
		<section id="projects" className="max-w-5xl mx-auto px-4 pb-12">
			<h2 className="text-2xl font-semibold mb-6">Projects</h2>

			<div className="grid gap-4">
				{visible.map((p) => (
					<a
						key={p.title}
						className="block border border-white/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition"
						href={p.href || "/projects"}
						target={p.href ? "_blank" : undefined}
						rel={p.href ? "noreferrer" : undefined}
					>
						<div className="font-medium">{p.title}</div>
						<div className="text-sm opacity-80">{p.desc}</div>
					</a>
				))}
			</div>

			{/* View all link */}
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