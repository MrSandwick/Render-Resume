import { Router } from "express"
import Project from "../models/Project.js"

const router = Router()

router.get("/", async (req, res) => {
	try {
		const { q, skill, sort = "-createdAt,date.start", limit = 50 } = req.query
		const filter = {}
		if (skill) filter.skills = skill

		let query = Project.find(filter)
		if (q) query = query.find({ $text: { $search: q } })

		const sortObj = Object.fromEntries(
			String(sort).split(",").filter(Boolean).map(k => [k.replace(/^-/, ""), k.startsWith("-") ? -1 : 1])
		)
		const lim = Math.min(100, Math.max(1, parseInt(limit, 10) || 50))

		const items = await query.sort(sortObj).limit(lim).lean()
		res.json(items)
	} catch (e) {
		console.error(e)
		res.status(500).json({ message: "Server error" })
	}
})

export default router
