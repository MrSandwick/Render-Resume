import 'dotenv/config'

export const env = {
	port: process.env.PORT || 5050,
	nodeEnv: process.env.NODE_ENV || 'development',
	origin: process.env.CORS_ORIGIN || '*',
	mongoUri: process.env.MONGO_URI,
	adminKey: process.env.ADMIN_API_KEY,
	smtp: {
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 587),
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
		from: process.env.MAIL_FROM,
		to: process.env.MAIL_TO
	}
}
