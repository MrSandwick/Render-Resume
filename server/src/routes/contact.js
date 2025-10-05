import { Router } from 'express'
import { z } from 'zod'
import rateLimit from 'express-rate-limit'
import { validate } from '../middleware/validate.js'
import { getTransport } from '../utils/mailer.js'
import { env } from '../env.js'

const router = Router()

const contactLimiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 10
})

const schema = z.object({
	body: z.object({
		name: z.string().min(1).max(100),
		email: z.string().email().max(200),
		message: z.string().min(10).max(5000)
	})
})

router.post('/', contactLimiter, validate(schema), async (req, res) => {
	const { name, email, message } = req.body
	try {
		const t = getTransport()
		const info = await t.sendMail({
			from: env.smtp.from,
			to: env.smtp.to,
			subject: `New portfolio contact from ${name}`,
			replyTo: email,
			text: `From: ${name} <${email}>\n\n${message}`,
			html: `
				<p><b>From:</b> ${name} &lt;${email}&gt;</p>
				<pre style="font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</pre>
			`
		})
		res.json({ ok: true, id: info.messageId })
	} catch (err) {
		console.error('Email error:', err)
		res.status(500).json({ ok: false, message: 'Failed to send' })
	}
})

function escapeHtml(s = '') {
	return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

router.get('/test', async (req, res) => {
	try {
		const t = getTransport()
		await t.verify() // checks server + auth
		res.json({ ok: true })
	} catch (e) {
		console.error('SMTP verify failed:', e)
		res.status(500).json({ ok: false, message: String(e?.message || e) })
	}
})


export default router
