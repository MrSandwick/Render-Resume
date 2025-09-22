// tabs indentation
import ShapeCanvas from '../components/techBadge.jsx'

const techIcons = [
	{ src: 'public/icons/reactjs.png', scale: 0.9 },
	{ src: 'public/icons/threejs.svg', scale: 0.9 },
	{ src: 'public/icons/tailwind.png', scale: 0.85 },
	{ src: 'public/icons/docker.png', scale: 0.9 },
	{ src: 'public/icons/nodejs.png', scale: 0.9 },
	{ src: 'public/icons/git.png', scale: 0.85 },
	{ src: 'public/icons/html.png', scale: 0.85 },
	{ src: 'public/icons/css.png', scale: 0.85 },
	{ src: 'public/icons/javascript.png', scale: 0.85 },
	{ src: 'public/icons/python.png', scale: 0.85 },
]

export default function TechStack() {
	return (
		<section id="tech" className="max-w-5xl mx-auto px-6 py-12">
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
