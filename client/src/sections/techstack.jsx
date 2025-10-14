// tabs indentation
import ShapeCanvas from '../components/tech/techbadge.jsx'

const techIcons = [
	{ src: 'icons/threejs.svg', scale: 0.9 },
	{ src: 'icons/threejs.svg', scale: 0.9 },
	{ src: 'icons/tailwind.png', scale: 0.85 },
	{ src: 'icons/docker.png', scale: 0.9 },
	{ src: 'icons/nodejs.png', scale: 0.9 },
	{ src: 'icons/git.png', scale: 0.85 },
	{ src: 'icons/html.png', scale: 0.85 },
	{ src: 'icons/css.png', scale: 0.85 },
	{ src: 'icons/javascript.png', scale: 0.85 },
	{ src: 'icons/python.png', scale: 0.85 },
]

export default function TechStack() {
	return (
		<section id="tech" className="max-w-5xl mx-auto px-4 py-12">
			<h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>

			<div className="flex flex-wrap justify-center gap-6">
				{techIcons.map((t, i) => (
					<div key={t.src + i} className="w-32 h-32">
						<ShapeCanvas color="#F6E8EA" icon={t.src} decalScale={t.scale} />
					</div>
				))}
			</div>
		</section>
	)
}