// routes/contact.js
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { sendEmail } from '../utils/mailer.js'

const router = Router()

// tighter limiter for contact
const contactLimiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 8,
	standardHeaders: true,
	legacyHeaders: false,
})

router.post('/', contactLimiter, async (req, res) => {
	// guard: JSON only
	const ct = req.get('content-type') || ''
	if (!/application\/json/i.test(ct)) {
		return res.status(415).json({ ok: false, message: 'Unsupported Media Type' })
	}

	const { name, email, subject, message, company } = req.body || {}

	// honeypot: ignore if bot filled it
	if (typeof company === 'string' && company.trim() !== '') {
		return res.json({ ok: true, message: 'Message sent' })
	}

	// minimal validation (no extra deps)
	if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
		return res.status(400).json({ ok: false, message: 'Valid email is required' })
	}
	if (!message || String(message).trim().length < 10) {
		return res.status(400).json({ ok: false, message: 'Message must be at least 10 characters' })
	}
	if (subject && String(subject).length > 200) {
		return res.status(400).json({ ok: false, message: 'Subject too long' })
	}

	try {
		const { messageId } = await sendEmail({ name, email, subject, message })
		return res.status(200).json({ ok: true, message: 'Message sent', id: messageId })
	} catch (err) {
		console.error('sendEmail error:', err)
		return res.status(502).json({ ok: false, message: 'Failed to send' })
	}
})

export default router
