import { useEffect, useMemo, useState } from 'react'
import { getProjects } from './api'

export function useProjects(params = {}) {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const key = useMemo(() => JSON.stringify(params || {}), [params])

	useEffect(() => {
		const ac = new AbortController()
		setLoading(true)
		setError(null)

		getProjects(params, { signal: ac.signal })
			.then((d) => setData(Array.isArray(d) ? d : []))
			.catch((e) => { if (e.name !== 'AbortError') setError(e) })
			.finally(() => setLoading(false))

		return () => ac.abort()
	}, [key])

	return { data, error, loading }
}
