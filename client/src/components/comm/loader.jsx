// /src/components/comm/loader.jsx
import React, { useEffect, useState } from 'react'

// Keep pools outside the component (no hooks needed)
const HEAD_POOL = ['+', '-', '=', '#', '*', '>', '<', '~',]
const FILL_POOL = ['#', '=', '+']

const randFrom = (arr) => arr[(Math.random() * arr.length) | 0]

export default function GlobalLoader({ label = 'Loading…', minShowMs = 400, intervalMs = 20 }) {
	const [visible, setVisible] = useState(true)
	const [tick, setTick] = useState(0)

	// Hide on window.load but not before minShowMs
	useEffect(() => {
		const start = performance.now()
		const onFinish = () => {
			const elapsed = performance.now() - start
			const left = Math.max(0, minShowMs - elapsed)
			const t = setTimeout(() => setVisible(false), left)
			// cleanup if effect reruns/unmounts
			return () => clearTimeout(t)
		}

		if (document.readyState === 'complete') {
			return onFinish()
		} else {
			const handler = () => { onFinish() }
			window.addEventListener('load', handler, { once: true })
			return () => window.removeEventListener('load', handler)
		}
	}, [minShowMs])

	// Fast ASCII animation loop
	useEffect(() => {
		if (!visible) return
		const id = setInterval(() => setTick((t) => t + 1), Math.max(8, intervalMs))
		return () => clearInterval(id)
	}, [visible, intervalMs])

	// ⬇️ Only now do the early return — after all hooks have been called.
	if (!visible) return null

	// Build the randomized bar
	const len = 22
	const pos = tick % len
	const head = randFrom(HEAD_POOL)

	const cells = Array.from({ length: len }, (_, i) => {
		if (i === pos) return head
		if (i < pos) return Math.random() < 0.90 ? randFrom(FILL_POOL) : '#'
		return '-'
	})
	const bar = `[${cells.join('')}]`

	return (
		<div
			className="fixed inset-0 z-[9999] bg-black text-white
					   flex flex-col items-center justify-center select-none"
			role="status" aria-live="polite" aria-busy="true"
			style={{
				fontFamily:
					'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			}}
		>
			<div className="text-lg tracking-widest tabular-nums">{bar}</div>
			<div className="mt-2 text-xs opacity-80">{label}</div>
		</div>
	)
}
