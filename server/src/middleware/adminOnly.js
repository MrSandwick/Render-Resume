import { env } from '../env.js'

export function adminOnly(req, res, next) {
	const key = req.headers['x-admin-key']
	if (!env.adminKey || key !== env.adminKey) {
		return res.status(401).json({ message: 'Unauthorized' })
	}
	next()
}
