import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema({
	label: { type: String, trim: true, required: true },
	href:  { type: String, trim: true, required: true }
}, { _id: false })

const DateRangeSchema = new mongoose.Schema({
	start: { type: String, trim: true }, // "YYYY-MM"
	end:   { type: String, trim: true }  // "YYYY-MM" or "Present"
}, { _id: false })

const ProjectSchema = new mongoose.Schema({
	// REQUIRED
	title:       { type: String, required: true, trim: true }, // ← renamed
	description: { type: String, required: true, trim: true },
	skills:      { type: [String], required: true, default: undefined },
	features:    { type: [String], required: true, default: undefined },

	// OPTIONAL
	associated:  { type: String, default: null, trim: true },
	date:        { type: DateRangeSchema, default: null },
	dateLabel:   { type: String, default: null, trim: true },
	links:       { type: [LinkSchema], default: [] }
}, { timestamps: true })

// helpful indexes (updated to use `title`)
ProjectSchema.index({ title: "text", description: "text", skills: "text", features: "text" })
ProjectSchema.index({ "date.start": 1 })

export default mongoose.model("Project", ProjectSchema)
