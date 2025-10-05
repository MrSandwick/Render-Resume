import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './db.js'
import { env } from './env.js'
import mongoose from 'mongoose'

import projectsRouter from './routes/projects.js'
import skillsRouter from './routes/skills.js'
import contactRouter from './routes/contact.js'

await connectDB()
console.log(
	"Mongo connected host=%s db=%s",
	mongoose.connection.host,
	mongoose.connection.name
)

const app = express()

app.use(helmet())
app.use(cors({ origin: env.origin, credentials: false }))
app.use(express.json({ limit: '1mb' }))

// global rate limit
app.use(rateLimit({
	windowMs: 60 * 1000,
	limit: 120,
	standardHeaders: true,
	legacyHeaders: false
}))

app.get('/api/health', (req, res) => {
	res.json({ ok: true, env: env.nodeEnv })
})

app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/contact', contactRouter)

app.listen(env.port, () => {
	console.log(`✓ API on http://localhost:${env.port}`)
})
