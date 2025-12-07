export function toSlug(v, fb) {
	const s = (v ?? fb ?? "").toString().toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
	return s || (fb?.toString?.() ?? "")
}

export function buildProjectPath(slide) {
	const slug = toSlug(slide?.title, slide?._id)
	return `/projects/${slug}`
}
