// tabs indentation
import ShapeCanvas from '../components/techbadge.jsx'

export default function TechStack() {
	return (
		<section id="tech" className="max-w-5xl mx-auto px-6 py-12">
			<h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>

			<div className="flex flex-wrap justify-center gap-6">
				<div className="w-32 h-32">
					<ShapeCanvas color="#F6E8EA" icon="public/icons/reactjs.png" />
				</div>
				<div className="w-32 h-32">
					<ShapeCanvas color="#F6E8EA" icon="public/icons/threejs.svg" />
				</div>
				<div className="w-32 h-32">
					<ShapeCanvas color="#F6E8EA" icon="public/icons/tailwind.png" />
				</div>
				<div className="w-32 h-32">
					<ShapeCanvas color="#F6E8EA" icon="public/icons/git.png" />
				</div>
				<div className="w-32 h-32">
					<ShapeCanvas color="#F6E8EA" icon="public/icons/docker.png" />
				</div>
			</div>
		</section>
	)
}
