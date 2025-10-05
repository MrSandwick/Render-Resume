// routes/projects.js
import { Router } from "express"
import Project from "../models/Project.js"

const router = Router()

router.get("/", async (req, res) => {
	try {
		const items = await Project.find().sort({ "date.start": -1, createdAt: -1 })
		res.json(items)
	} catch (e) {
		res.status(500).json({ message: "Server error" })
	}
})

router.post("/", async (req, res) => {
	try {
		const doc = await Project.create(req.body)
		res.status(201).json(doc)
	} catch (e) {
		res.status(400).json({ message: e.message })
	}
})

export default router
