// utils/mailer.js
import nodemailer from 'nodemailer'
import { env } from '../env.js'

const transporter = nodemailer.createTransport({
	host: env.smtp.host,
	port: env.smtp.port,
	secure: env.smtp.port === 465, // SSL for 465, STARTTLS for 587/25
	auth: {
		user: env.smtp.user,
		pass: env.smtp.pass,
	},
})

// optional: verify once on boot (logs only)
transporter.verify()
	.then(() => console.log('✓ SMTP ready'))
	.catch(err => console.warn('✗ SMTP verify failed:', err?.message))

/**
 * Send contact message to your inbox.
 * - Delivers to MAIL_TO (from env), sets visitor email as Reply-To
 */
export async function sendEmail({ name = 'Visitor', email, subject = 'New contact message', message }) {
	const info = await transporter.sendMail({
		from: env.smtp.from || env.smtp.user, // "Brand <no-reply@domain>"
		to: env.smtp.to || env.smtp.user,     // your inbox
		replyTo: email || undefined,          // visitor's email (so you can reply)
		subject,
		text: String(message || ''),
		html: `
			<div style="font-family:system-ui,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5">
				<p><strong>Name:</strong> ${name || '—'}</p>
				<p><strong>Email:</strong> ${email || '—'}</p>
				<hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0">
				<pre style="white-space:pre-wrap;margin:0">${String(message || '')}</pre>
			</div>
		`,
	})
	return { messageId: info.messageId }
}
