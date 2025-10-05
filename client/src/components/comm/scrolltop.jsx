export default function ScrollTopButton() {
	const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
	return (
		<button
			type="button"
			onClick={goTop}
			aria-label="Back to top"
			className="fixed bottom-6 right-6 z-50 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-white/40"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
				<path d="M5 15l7-7 7 7" />
			</svg>
		</button>
	)
}
