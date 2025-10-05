import { Router } from 'express'
import { z } from 'zod'
import Project from '../models/Project.js'
import { adminOnly } from '../middleware/adminOnly.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const upsertSchema = z.object({
	body: z.object({
		title: z.string().min(1),
		desc: z.string().optional().default(''),
		tags: z.array(z.string()).optional().default([]),
		github: z.string().url().optional().or(z.literal('')),
		live: z.string().url().optional().or(z.literal('')),
		featured: z.boolean().optional().default(false),
		images: z.array(z.string()).optional().default([])
	})
})

router.get('/', async (req, res) => {
	const { q, featured } = req.query
	const filter = {}
	if (featured === 'true') filter.featured = true
	if (q) filter.$text = { $search: String(q) }
	const items = await Project.find(filter).sort({ createdAt: -1 }).lean()
	res.json(items)
})

router.get('/:id', async (req, res) => {
	const doc = await Project.findById(req.params.id).lean()
	if (!doc) return res.status(404).json({ message: 'Not found' })
	res.json(doc)
})

router.post('/', adminOnly, validate(upsertSchema), async (req, res) => {
	const doc = await Project.create(req.body)
	res.status(201).json(doc)
})

router.put('/:id', adminOnly, validate(upsertSchema), async (req, res) => {
	const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
	if (!doc) return res.status(404).json({ message: 'Not found' })
	res.json(doc)
})

router.delete('/:id', adminOnly, async (req, res) => {
	const deleted = await Project.findByIdAndDelete(req.params.id)
	if (!deleted) return res.status(404).json({ message: 'Not found' })
	res.json({ ok: true })
})

export default router
