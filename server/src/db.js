import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDB() {
	if (!env.mongoUri) throw new Error('MONGO_URI missing')

	mongoose.set('strictQuery', true)
	// optional: see what Mongoose is doing
	// mongoose.set('debug', true)

	try {
		console.log('→ Connecting to Mongo:', redact(env.mongoUri))
		await mongoose.connect(env.mongoUri, {
			autoIndex: true,
			serverSelectionTimeoutMS: 8000 // fail fast if unreachable
		})
		console.log('✓ Mongo connected')
	} catch (err) {
		console.error('✗ Mongo connection error:', err?.reason ?? err?.message ?? err)
		throw err
	}
}

function redact(uri = '') {
	// hide password in logs
	return uri.replace(/(mongodb(\+srv)?:\/\/[^:]+:)[^@]+@/i, '$1*****@')
}
