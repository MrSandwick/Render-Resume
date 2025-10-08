import { useEffect, useState } from 'react'
import { getSkills } from './api'

export function useSkills() {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const ac = new AbortController()
		getSkills({ signal: ac.signal })
			.then((d) => setData(Array.isArray(d) ? d : []))
			.catch((e) => { if (e.name !== 'AbortError') setError(e) })
			.finally(() => setLoading(false))
		return () => ac.abort()
	}, [])

	return { data, error, loading }
}
