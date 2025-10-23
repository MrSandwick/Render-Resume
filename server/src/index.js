// server/src/index.js (ESM, no top-level await)
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { onRequest } from 'firebase-functions/v2/https'

import { connectDB } from './db.js'
import { env } from './env.js'
import projectsRouter from './routes/projects.js'
import skillsRouter from './routes/skills.js'
import contactRouter from './routes/contact.js'

const app = express()

// --- connect DB once, lazily (no TLA) ---
let dbReady
function ensureDB() {
	if (!dbReady) {
		dbReady = connectDB().catch((err) => {
			console.error('DB connect failed:', err)
			dbReady = undefined
			throw err
		})
	}
	return dbReady
}

// --- hardening & basics ---
app.set('trust proxy', 1)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }))
const allowed = (env.origin || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({ origin: allowed.length ? allowed : undefined, credentials: false }))
app.use(express.json({ limit: '100kb' }))
app.use(rateLimit({
	windowMs: 60 * 1000,
	limit: 120, 
	standardHeaders: true, 
	legacyHeaders: false, 
	}))

// --- gate all routes until DB is ready ---
app.use(async (_req, _res, next) => {
	try { await ensureDB(); next() } catch (e) { next(e) }
})

// --- health ---
app.get('/health', (_req, res) => res.json({ ok: true, env: env.nodeEnv }))
app.get('/api/health', (_req, res) => res.json({ ok: true, env: env.nodeEnv }))

// --- routes (keep /api prefix: Hosting rewrites /api/** -> function) ---
app.use('/api/projects', projectsRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/contact', contactRouter)

// --- 404 & error ---
app.use((req, res) => res.status(404).json({ ok: false, message: 'Not found' }))
app.use((err, _req, res, _next) => {
	console.error('Unhandled error:', err)
	res.status(500).json({ ok: false, message: 'Internal server error' })
})

// ❗ app.listen for local dev
app.listen(env.port, () => {
	console.log(`✓ API on http://localhost:${env.port}`)
})

// ❗ no app.listen in Cloud Functions
// export const server = onRequest({ region: 'us-central1' }, app)
