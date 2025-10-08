// src/components/ui/FloatingAlert.jsx
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function FloatingAlert({
	type = 'error',        // 'error' | 'success' | 'info'
	title = 'Notice',
	message = '',
	duration = 2500,       // set null to disable auto-dismiss
	onClose = () => {},
}) {
	useEffect(() => {
		if (!duration) return
		const t = setTimeout(onClose, duration)
		return () => clearTimeout(t)
	}, [duration, onClose])

	const icon =
		type === 'success' ? '✔️' :
		type === 'info'    ? '💬' : '⚠️'

	return createPortal(
		<div className="fixed inset-x-0 top-4 z-[10000] flex justify-center px-4 pointer-events-none">
			<div role="alert" aria-live="assertive" className="pointer-events-auto w-full max-w-md">
				<div className="rounded-xl bg-black/80 text-white backdrop-blur-md shadow-lg ring-1 ring-white/10 anim-fade px-4 py-3">
					<div className="flex items-start gap-3">
						<div className="text-xl leading-none anim-wiggle-once">{icon}</div>
						<div className="min-w-0 flex-1">
							<div className="font-semibold truncate">{title}</div>
							{message ? <div className="text-sm opacity-90 mt-0.5 break-words">{message}</div> : null}
						</div>
						<button
							onClick={onClose}
							className="ml-2 shrink-0 rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-xs"
						>
							Close
						</button>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes fadeIn { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }
				.anim-fade { animation: fadeIn .18s ease-out both; }

				@keyframes wiggleOnce {
					0%,100% { transform: rotate(0deg) }
					25% { transform: rotate(-8deg) }
					75% { transform: rotate(8deg) }
				}
				.anim-wiggle-once { animation: wiggleOnce .5s ease-in-out 1; transform-origin: center; }
			`}</style>
		</div>,
		document.body
	)
}
