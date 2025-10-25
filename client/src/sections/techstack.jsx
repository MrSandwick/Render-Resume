// tabs indentation
import { useEffect, useMemo, useState } from 'react'
import ShapeCanvas from '../components/tech/techbadge.jsx'
import { SPHERE_ICONS } from '../db/sphereIcons.js'

function useSmallScreen(breakpointPx = 768) {
	const [isSmall, setIsSmall] = useState(false)

	useEffect(() => {
		const mq = window.matchMedia?.(`(max-width: ${breakpointPx}px)`)
		const update = () => setIsSmall(mq?.matches ?? window.innerWidth <= breakpointPx)
		update()

		mq?.addEventListener?.('change', update)
		window.addEventListener('resize', update)
		window.addEventListener('orientationchange', update)

		return () => {
			mq?.removeEventListener?.('change', update)
			mq?.removeListener?.(update) // legacy fallback
			window.removeEventListener('resize', update)
			window.removeEventListener('orientationchange', update)
		}
	}, [breakpointPx])

	return isSmall
}

export default function TechStack() {
	const isSmall = useSmallScreen(768)
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
