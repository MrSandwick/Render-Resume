// tabs indentation
import TechBadge from '../components/techbadge.jsx'

const stack = [
	{ label: 'React', type: 'torus', color: '#61dafb' },
	{ label: 'Three.js', type: 'knot', color: '#ffffff' },
	{ label: 'Tailwind CSS', type: 'cone', color: '#38bdf8' },
	{ label: 'JavaScript', type: 'box', color: '#f7df1e' },
	{ label: 'Python', type: 'sphere', color: '#ffd343' },
	{ label: 'Docker', type: 'torus', color: '#1d63ed' },
]

export default function TechStack() {
	return (
		<section id="tech" className="max-w-5xl mx-auto px-4 py-12">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
				<p className="opacity-80 mb-8 text-sm">
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{stack.map((t) => (
						<TechBadge key={t.label} label={t.label} type={t.type} color={t.color} />
					))}
				</div>
			</div>
		</section>
	)
}
