import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema({
	name: { type: String, required: true, index: true },
	category: { type: String, required: true },
	desc: { type: String, default: '' },
	icon: { type: String, default: '' }
}, { timestamps: true })

SkillSchema.index({ name: 1, category: 1 }, { unique: true })

export default mongoose.model('Skill', SkillSchema)
