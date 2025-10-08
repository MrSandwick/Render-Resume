// src/components/contact/EmailFormCard.jsx
import React, { useState } from 'react'

export default function EmailFormCard() {
	const [form, setForm] = useState({ name: '', email: '', message: '' })
	const [status, setStatus] = useState({ state: 'idle', msg: '' })

	function onChange(e) {
		const { name, value } = e.target
		setForm((f) => ({ ...f, [name]: value }))
	}

	async function onSubmit(e) {
		e.preventDefault()
		setStatus({ state: 'loading', msg: '' })
		try {
			const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
			if (!res.ok) {
				const { message } = await res.json().catch(() => ({ message: 'Failed to send' }))
				throw new Error(message || 'Failed to send')
			}
			setForm({ name: '', email: '', message: '' })
			setStatus({ state: 'success', msg: 'Thanks! Your message has been sent.' })
		} catch (err) {
			setStatus({ state: 'error', msg: err.message || 'Something went wrong.' })
		}
	}

	const disabled = status.state === 'loading'

	return (
		<div className="max-w-md bg-white/5 backdrop-blur rounded-2xl p-4 md:p-5 ring-1 ring-white/10 shadow-lg">

			<form onSubmit={onSubmit} className="space-y-3" noValidate>
				<div>
					<input
						id="name"
						name="name"
						type="text"
						required
						value={form.name}
						onChange={onChange}
						className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40"
						placeholder="Name"
					/>
				</div>

				<div>
					<input
						id="email"
						name="email"
						type="email"
						required
						value={form.email}
						onChange={onChange}
						className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40"
						placeholder="Email Address"
					/>
				</div>

				<div>
					<textarea
						id="message"
						name="message"
						required
						minLength={10}
						value={form.message}
						onChange={onChange}
						rows={4}
						className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40 resize-none h-26 min-h-0 md:h-26"
						placeholder="Message"
					/>
				</div>

				<button
					type="submit"
					disabled={disabled}
					className="w-full rounded-xl px-3 py-1.5 text-sm ring-1 ring-white/10 bg-white/10 hover:bg-white/15 transition disabled:opacity-60"
				>
					{status.state === 'loading' ? 'Sending…' : 'Send message'}
				</button>

				{status.state === 'success' && (
					<p className="text-emerald-400 text-xs">{status.msg}</p>
				)}
				{status.state === 'error' && (
					<p className="text-red-400 text-xs">{status.msg}</p>
				)}
			</form>
		</div>
	)
}
