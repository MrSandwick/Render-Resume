import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
	title: { type: String, required: true, index: true },
	desc: { type: String, default: '' },
	tags: { type: [String], default: [] },
	github: { type: String, default: '' },
	live: { type: String, default: '' },
	featured: { type: Boolean, default: false },
	images: { type: [String], default: [] }
}, { timestamps: true })

ProjectSchema.index({ title: 'text', desc: 'text', tags: 1 })

export default mongoose.model('Project', ProjectSchema)
