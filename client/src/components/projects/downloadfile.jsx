// utils/downloadFile.js
export async function downloadFile(url, filename) {
	try {
		const res = await fetch(url, { credentials: 'omit' })
		if (!res.ok) throw new Error(`HTTP ${res.status}`)
		const blob = await res.blob()
		const objectUrl = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = objectUrl
		a.download = filename || url.split('/').pop() || 'download'
		document.body.appendChild(a)
		a.click()
		a.remove()
		URL.revokeObjectURL(objectUrl)
	} catch (err) {
		console.error('Download failed:', err)
		alert('Download failed. Try again or open the link directly.')
	}
}
