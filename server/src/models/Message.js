import mongoose from 'mongoose'

// Every contact-form submission is stored here first, so a mail outage never loses a message.
const MessageSchema = new mongoose.Schema({
	name:    { type: String, trim: true, maxlength: 100, default: '' },
	email:   { type: String, trim: true, maxlength: 200, required: true },
	subject: { type: String, trim: true, maxlength: 200, default: '' },
	message: { type: String, trim: true, maxlength: 5000, required: true },
	emailed: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Message', MessageSchema)
