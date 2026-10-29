// tabs indentation
import { useMemo } from 'react'
import ShapeCanvas from '../components/tech/techbadge.jsx'
import { SPHERE_ICONS } from '../db/sphereIcons.js'
import useIsMobile from '../lib/useIsMobile.js'

export default function TechStack() {
	const isSmall = useIsMobile()
	const iconsToRender = useMemo(
		() => (isSmall ? SPHERE_ICONS.slice(0, 5) : SPHERE_ICONS),
		[isSmall]
	)

	return (
		<section id="tech" className="max-w-5xl mx-auto px-4 py-12">
			<a
				href="/tech"
				className="inline-block text-2xl font-semibold mb-3 text-white cursor-pointer transition duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
			>
				Tech Stack
			</a>

			{/* Old flex layout (wrap + centered rows) */}
			<div className="flex flex-wrap justify-center gap-6">
				{iconsToRender.map((t) => (
					<div key={t.id ?? t.src} className="w-32 h-32">
						<ShapeCanvas color="#F6E8EA" icon={t.src} decalScale={t.scale} />
					</div>
				))}
			</div>
		</section>
	)
}
