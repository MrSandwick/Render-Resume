import mongoose from "mongoose"

export const SKILL_CATEGORIES = [
	"Programming & Development",
	"Data Science & Machine Learning",
	"Databases",
	"Cloud & DevOps",
	"Networking & Security",
	"Software Engineering Concepts",
	"Tools & Environments",
	"Project & Process Management",
	"Soft Skills"
]

const SkillSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	category: { type: String, required: true, enum: SKILL_CATEGORIES },
	desc: { type: String, default: "", trim: true },
	icon: { type: String, default: "", trim: true }
}, { timestamps: true })

// Prevent duplicates like two "Docker" rows in the same category
SkillSchema.index({ category: 1, name: 1 }, { unique: true })

export default mongoose.model("Skill", SkillSchema)
