import { Router } from 'express'
import { z } from 'zod'
import Skill from '../models/Skill.js'
import { adminOnly } from '../middleware/adminOnly.js'
import { validate } from '../middleware/validate.js'

const router = Router()

const upsertSchema = z.object({
	body: z.object({
		name: z.string().min(1),
		category: z.string().min(1),
		level: z.string().optional().default(''),
		desc: z.string().optional().default(''),
		icon: z.string().optional().default('')
	})
})

router.get('/', async (req, res) => {
	const items = await Skill.find().sort({ category: 1, name: 1 }).lean()
	res.json(items)
})

router.get('/:id', async (req, res) => {
	const doc = await Skill.findById(req.params.id).lean()
	if (!doc) return res.status(404).json({ message: 'Not found' })
	res.json(doc)
})

router.post('/', adminOnly, validate(upsertSchema), async (req, res) => {
	const doc = await Skill.create(req.body)
	res.status(201).json(doc)
})

router.put('/:id', adminOnly, validate(upsertSchema), async (req, res) => {
	const doc = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })
	if (!doc) return res.status(404).json({ message: 'Not found' })
	res.json(doc)
})

router.delete('/:id', adminOnly, async (req, res) => {
	const deleted = await Skill.findByIdAndDelete(req.params.id)
	if (!deleted) return res.status(404).json({ message: 'Not found' })
	res.json({ ok: true })
})

export default router
