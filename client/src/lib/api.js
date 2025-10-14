const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

async function getJSON(path, { signal } = {}) {
	const res = await fetch(`${BASE}${path.startsWith('/') ? path : `/${path}`}`, {
		method: 'GET',
		headers: { Accept: 'application/json' },
		signal,
	})

	const data = await res.json().catch(() => null)

	if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`)

	return data
}


function q(params = {}) {
	const usp = new URLSearchParams()
	for (const [k, v] of Object.entries(params)) {
		if (v === undefined || v === null || v === '') continue
		usp.set(k, String(v))
	}
	const s = usp.toString()
	return s ? `?${s}` : ''
}

/* ---- Public API ---- */
export function getProjects(params = {}, opts = {}) {
	return getJSON(`/api/projects${q(params)}`, opts)
}

export function getSkills(opts = {}) {
	return getJSON('/api/skills', opts)
}

export async function sendContact({ name, email, message, subject = '', company = '' }) {
	const res = await fetch(`${BASE}/api/contact`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, subject, message, company }),
	})
	let data = null
	try { data = await res.json() } catch {}
	if (!res.ok) throw new Error(data?.message || 'Failed to send')
	return data
}
