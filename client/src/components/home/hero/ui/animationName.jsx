// src/components/home/hero/components/AnimatedName.jsx
// tabs indentation
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const nameContainer = (stagger = 0.035, delay = 0.1) => ({
	hidden: {},
	show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const nameChar = {
	hidden: { opacity: 0, y: 14, rotateX: -90 },
	show: {
		opacity: 1, y: 0, rotateX: 0,
		transition: { type: 'spring', stiffness: 520, damping: 26, mass: 0.6 },
	},
}

export default function AnimatedName({ text, className = '', start = true }) {
	const isMobile = useIsMobile()
	const chars = useMemo(() => text.split(''), [text])
	const container = nameContainer(isMobile ? 0.02 : 0.035, isMobile ? 0.05 : 0.1)

	return (
		<motion.span
			variants={container}
			initial="hidden"
			animate={start ? 'show' : 'hidden'}
			whileHover={!isMobile && start ? { x: [0, -1, 1, 0], rotateZ: [0, -0.5, 0.5, 0] } : {}}
			whileTap={start ? { scale: 0.98 } : {}}
			className={className}
			style={{ willChange: 'transform, opacity' }}
		>
			{chars.map((c, i) => (
				<motion.span key={i} variants={nameChar} style={{ display: 'inline-block' }}>
					{c === ' ' ? '\u00A0' : c}
				</motion.span>
			))}
		</motion.span>
	)
}
