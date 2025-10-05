// server/src/routes/skills.js
import { Router } from "express"
import Skill from "../models/Skill.js"

const router = Router()

router.get("/", async (_req, res) => {
	try {
		const items = await Skill.find().sort({ category: 1, name: 1 })
		res.json(items)
	} catch (e) {
		res.status(500).json({ message: "Server error" })
	}
})

export default router
