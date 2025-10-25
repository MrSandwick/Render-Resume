// src/components/home/hero/hooks/useIsMobile.js
// tabs indentation
import { useEffect, useState } from 'react'

export default function useIsMobile(bp = 768) {
	const [m, setM] = useState(false)
	useEffect(() => {
		const mq = window.matchMedia?.(`(max-width:${bp}px)`)
		const update = () => setM(mq?.matches ?? window.innerWidth <= bp)
		update()
		mq?.addEventListener?.('change', update)
		return () => mq?.removeEventListener?.('change', update)
	}, [bp])
	return m
}
