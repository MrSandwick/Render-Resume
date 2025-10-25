// src/components/home/hero/hooks/useStartWhenVisible.js
// tabs indentation
import { useEffect, useState } from 'react'

/** Returns true once the element is in view AND not covered by a top overlay (e.g., loader). */
export default function useStartWhenVisible(ref, { timeout = 15000 } = {}) {
	const [start, setStart] = useState(false)

	useEffect(() => {
		if (start || !ref.current) return
		const el = ref.current
		let inView = false
		let rafId = null
		let done = false

		const cleanup = (io, to) => {
			done = true
			io && io.disconnect()
			if (rafId) cancelAnimationFrame(rafId)
			if (to) clearTimeout(to)
		}

		const io = new IntersectionObserver(([entry]) => {
			inView = !!entry?.isIntersecting
		}, { threshold: 0.2 })
		io.observe(el)

		const check = () => {
			if (done) return
			if (!inView) {
				rafId = requestAnimationFrame(check)
				return
			}
			const r = el.getBoundingClientRect()
			const x = r.left + r.width / 2
			const y = r.top + r.height / 2
			const topEl = document.elementFromPoint(x, y)
			const covered = topEl && !el.contains(topEl)
			if (!covered) {
				setStart(true)
				cleanup(io, to)
			} else {
				rafId = requestAnimationFrame(check)
			}
		}
		rafId = requestAnimationFrame(check)

		const to = setTimeout(() => {
			if (!done) {
				setStart(true)
				cleanup(io, to)
			}
		}, timeout)

		return () => cleanup(io, to)
	}, [ref, start, timeout])

	return start
}
