// src/components/home/hero/components/HackerText.jsx
// tabs indentation
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function HackerText({ text, duration = 1100, fps = 60, className = '', start = true }) {
	const [out, setOut] = useState('')
	const timerRef = useRef(null)
	const prefersReduced = useReducedMotion()
	const chars = '!<>-_\\/[]{}—=+*^?#%$@&~|'

	const run = () => {
		clearInterval(timerRef.current)
		if (prefersReduced) { setOut(text); return }
		let frame = 0
		const total = Math.max(1, Math.round((duration / 1000) * fps))
		timerRef.current = setInterval(() => {
			frame++
			const p = frame / total
			const s = text.split('').map((ch, i) => {
				if (ch === ' ') return ' '
				const threshold = i / text.length
				return p > threshold ? ch : chars[Math.floor(Math.random() * chars.length)]
			}).join('')
			setOut(s)
			if (frame >= total) {
				setOut(text)
				clearInterval(timerRef.current)
			}
		}, 1000 / fps)
	}

	useEffect(() => {
		if (!start) return
		run()
		return () => clearInterval(timerRef.current)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text, start])

	return (
		<span className={className} onMouseEnter={() => start && run()} onTouchStart={() => start && run()}>
			{start ? out : ''}
		</span>
	)
}
