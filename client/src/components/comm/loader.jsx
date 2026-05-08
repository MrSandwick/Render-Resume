import { useState, useEffect, useRef } from 'react'
import { useProgress } from '@react-three/drei'

const FILL_POOL = ['+', '=', '-', '~']
const BAR_LEN = 22
const TRAIL = 8                    // chars behind the head that form the fading tail
const CYCLE = 2 * (BAR_LEN - 1)   // full ping-pong cycle length

const randFrom = (arr) => arr[(Math.random() * arr.length) | 0]

export default function GlobalLoader({ label = 'Loading…', minShowMs = 1800, intervalMs = 45 }) {
	const [visible, setVisible] = useState(true)
	const [tick, setTick] = useState(0)
	// Tracks drei asset loading (Environment HDR, GLTF models, etc.) globally — works outside Canvas
	const { active: assetsLoading } = useProgress()

	const mountTime = useRef(performance.now())
	const windowReady = useRef(document.readyState === 'complete')
	// Captured once at mount: true means this is an SPA navigation, not the initial page load.
	// SPA navigations get a shorter minimum so cached-asset routes don't feel sluggish.
	const isSpaNav = useRef(document.readyState === 'complete')
	const timerRef = useRef(null)

	// Hide only when both window.load AND drei assets are done
	useEffect(() => {
		function scheduleHide() {
			if (!windowReady.current || assetsLoading || timerRef.current) return
			const effectiveMin = isSpaNav.current ? Math.min(1000, minShowMs) : minShowMs
			const left = Math.max(0, effectiveMin - (performance.now() - mountTime.current))
			timerRef.current = setTimeout(() => setVisible(false), left)
		}

		if (!windowReady.current) {
			// Initial page load: wait for window.load before deciding to hide.
			// By then the Canvas is long mounted and useProgress is accurate.
			const onLoad = () => { windowReady.current = true; scheduleHide() }
			window.addEventListener('load', onLoad, { once: true })
			return () => {
				window.removeEventListener('load', onLoad)
				clearTimeout(timerRef.current)
				timerRef.current = null
			}
		}

		// SPA navigation (window.load already fired): defer one frame so the
		// Canvas has time to mount and register asset loads with useProgress
		// before we decide there is nothing left to wait for.
		const rafId = requestAnimationFrame(scheduleHide)
		return () => {
			cancelAnimationFrame(rafId)
			clearTimeout(timerRef.current)
			timerRef.current = null
		}
	}, [assetsLoading, minShowMs])

	// ASCII animation loop — stops as soon as loader is hidden
	useEffect(() => {
		if (!visible) return
		const id = setInterval(() => setTick(t => t + 1), Math.max(8, intervalMs))
		return () => clearInterval(id)
	}, [visible, intervalMs])

	if (!visible) return null

	// Ping-pong: 0 → BAR_LEN-1 → 0 → …
	const phase = tick % CYCLE
	const pos = phase < BAR_LEN ? phase : CYCLE - phase
	const forward = phase < BAR_LEN - 1
	const head = forward ? '>' : '<'

	const bar = Array.from({ length: BAR_LEN }, (_, i) => {
		if (i === pos) return head
		// distance "behind" the head in its current direction of travel
		const dist = forward ? pos - i : i - pos
		if (dist > 0 && dist <= TRAIL) {
			// density fades from 1.0 at dist=1 to ~0.1 at dist=TRAIL
			const density = 1 - (dist - 1) / TRAIL
			return Math.random() < density ? randFrom(FILL_POOL) : '-'
		}
		return '-'
	}).join('')

	return (
		<div
			className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center select-none"
			role="status"
			aria-live="polite"
			aria-busy="true"
			style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}
		>
			<div className="text-lg tracking-widest tabular-nums">[{bar}]</div>
			<div className="mt-2 text-xs opacity-80">{label}</div>
		</div>
	)
}
