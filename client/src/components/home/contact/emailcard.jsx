// src/components/contact/EmailFormCard.jsx
import React, { useState } from 'react'
import FloatingAlert from '../../comm/alert'
import { sendContact } from '../../../lib/api.js'

export default function EmailFormCard() {
	const [form, setForm] = useState({ name: '', email: '', message: '', subject: '', company: '' }) // company = honeypot
	const [status, setStatus] = useState({ state: 'idle', msg: '' })
	const [alert, setAlert] = useState(null)

	function onChange(e) {
		const { name, value } = e.target
		setForm((f) => ({ ...f, [name]: value }))
	}

	async function onSubmit(e) {
		e.preventDefault()
		// quick client validation (mirrors backend)
		if (!/^\S+@\S+\.\S+$/.test(form.email)) {
			return setAlert({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email.' })
		}
		if (!form.message || form.message.trim().length < 10) {
			return setAlert({ type: 'error', title: 'Too short', message: 'Message must be at least 10 characters.' })
		}

		setStatus({ state: 'loading', msg: '' })
		try {
			await sendContact(form)
			setForm({ name: '', email: '', message: '', subject: '', company: '' })
			setStatus({ state: 'success', msg: 'Thanks! Your message has been sent.' })
			setAlert({ type: 'success', title: 'Message sent', message: 'I’ll get back to you soon.' })
		} catch (err) {
			setStatus({ state: 'error', msg: err.message || 'Something went wrong.' })
			setAlert({ type: 'error', title: 'Send failed', message: err?.message || 'Please try again in a moment.' })
		}
	}

	const disabled = status.state === 'loading'

	return (
		<>
			<div className="max-w-md bg-white/5 backdrop-blur rounded-2xl p-4 md:p-5 ring-1 ring-white/10 shadow-lg">
				<form onSubmit={onSubmit} className="space-y-3" noValidate autoComplete="on">
					{/* honeypot: hidden field (bots fill this, humans don't) */}
					<input
						type="text"
						name="company"
						value={form.company}
						onChange={onChange}
						className="hidden"
						tabIndex={-1}
						autoComplete="off"
						aria-hidden="true"
					/>

					<div>
						<input
							id="name" name="name" type="text" required autoComplete="name"
							value={form.name} onChange={onChange}
							className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40"
							placeholder="Name"
						/>
					</div>

					<div>
						<input
							id="email" name="email" type="email" required autoComplete="email"
							value={form.email} onChange={onChange}
							className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40"
							placeholder="Email Address"
						/>
					</div>

					<div>
						<input
							id="subject" name="subject" type="text" autoComplete="off"
							value={form.subject} onChange={onChange}
							className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40"
							placeholder="Subject (optional)"
						/>
					</div>

					<div>
						<textarea
							id="message" name="message" required minLength={10} autoComplete="off"
							value={form.message} onChange={onChange} rows={4}
							className="w-full rounded-xl bg-black/30 ring-1 ring-white/10 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-white/40 resize-none h-26 min-h-0 md:h-26"
							placeholder="Message"
						/>
					</div>

					<button
						type="submit" disabled={disabled}
						className="w-full rounded-xl px-3 py-1.5 text-sm ring-1 ring-white/10 bg-white/10 hover:bg-white/15 transition disabled:opacity-60"
					>
						{status.state === 'loading' ? 'Sending…' : 'Send message'}
					</button>
				</form>
			</div>

			{alert && (
				<FloatingAlert
					type={alert.type}
					title={alert.title}
					message={alert.message}
					duration={3000}
					onClose={() => setAlert(null)}
				/>
			)}
		</>
	)
}
