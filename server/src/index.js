import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { connectDB } from './db.js'
import { env } from './env.js'
import projectsRouter from './routes/projects.js'
import skillsRouter from './routes/skills.js'
import contactRouter from './routes/contact.js'

const app = express()
await connectDB()

app.set('trust proxy', 1)
app.use(helmet({
	crossOriginResourcePolicy: { policy: 'same-site' },
}))
// allow comma-separated origins or "*" fallback from your env
const allowed = (env.origin || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({
	origin: allowed.length ? allowed : undefined,
	credentials: false,
}))
app.use(express.json({ limit: '100kb' }))

app.use(rateLimit({
	windowMs: 60 * 1000,
	limit: 120,
	standardHeaders: true,
	legacyHeaders: false,
}))

// health
app.get('/health', (_, res) => res.json({ ok: true, env: env.nodeEnv }))
app.get('/api/health', (_, res) => res.json({ ok: true, env: env.nodeEnv }))

// routes
app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/contact', contactRouter)

// 404 + error
app.use((req, res) => res.status(404).json({ ok: false, message: 'Not found' }))
app.use((err, _req, res, _next) => {
	console.error('Unhandled error:', err)
	res.status(500).json({ ok: false, message: 'Internal server error' })
})

app.listen(env.port, () => {
	console.log(`✓ API on http://localhost:${env.port}`)
})
