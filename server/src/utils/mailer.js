import nodemailer from 'nodemailer'
import { env } from '../env.js'

export function getTransport() {
	if (!env.smtp.host) throw new Error('SMTP not configured')

	// Gmail via App Password
	return nodemailer.createTransport({
		host: env.smtp.host,          // smtp.gmail.com
		port: env.smtp.port,          // 465 preferred (SSL)
		secure: env.smtp.port === 465, // true for 465, false for 587
		auth: {
			user: env.smtp.user,      
			pass: env.smtp.pass       
		}
	})
}
