import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema({
	label: { type: String, required: true, trim: true },
	href:  { type: String, required: true, trim: true }
}, { _id: false })

const DateRangeSchema = new mongoose.Schema({
	start: { type: String, required: true, trim: true }, // "YYYY-MM"
	end:   { type: String, required: true, trim: true }   // "YYYY-MM" or "Present"
}, { _id: false })

const ProjectSchema = new mongoose.Schema({
	id:          { type: String, required: true, unique: true, trim: true }, // slug, e.g. "car-dealership-network"
	title:       { type: String, required: true, trim: true },
	associated:  { type: String, default: null, trim: true }, // nullable
	date:        { type: DateRangeSchema, required: true },
	dateLabel:   { type: String, required: true, trim: true }, // e.g., "Jun 2024 – Sep 2024"
	description: { type: String, required: true, trim: true },
	skills:      { type: [String], default: [] },              // ["Network Security","VLANs",...]
	features:    { type: [String], default: [] },              // bullet list
	links:       { type: [LinkSchema], default: [] }           // [{label, href}]
}, { timestamps: true })

// helpful indexes
ProjectSchema.index({ "date.start": 1 })
ProjectSchema.index({ title: "text", description: "text" })

export default mongoose.model("Project", ProjectSchema)