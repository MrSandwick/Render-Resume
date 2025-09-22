// tabs indentation
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const navItems = [
	{ to: '/', label: 'About' },
	{ to: '/projects', label: 'Projects' },
	{ to: '/tech', label: 'Stack' },
	{ to: '/#contact', label: 'Contact' },

]

export default function Navbar() {
	const [open, setOpen] = useState(false)

	return (
		<header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur text-white">
			<nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
				<HashLink to="/" className="font-bold">Render & Resume</HashLink>

				{/* Desktop links */}
				<div className="hidden md:flex items-center gap-6 text-sm">
					{navItems.map(i => (
						<HashLink key={i.label} to={i.to} className="opacity-80 hover:opacity-100">
							{i.label}
						</HashLink>
					))}
				</div>

				{/* Burger (mobile only) */}
				<button
					type="button"
					className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 hover:bg-white/10 text-white"
					onClick={() => setOpen(v => !v)}
					aria-label="Toggle menu"
					aria-expanded={open}
				>
					<div className="relative block w-5 h-4">
						<span
							className={
								"left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-300 " +
								(open ? "translate-y-1.5 rotate-45" : "")
							}
						/>
						<span
							className={
								"absolute left-0 top-1/2 -translate-y-1/2 block h-0.5 w-5 bg-current transition-opacity duration-300 " +
								(open ? "opacity-0" : "opacity-100")
							}
						/>
						<span
							className={
								"absolute left-0 bottom-0 block h-0.5 w-5 bg-current transition-transform duration-300 " +
								(open ? "-translate-y-2 -rotate-45" : "")
							}
						/>
					</div>
				</button>
			</nav>

			{/* Mobile panel */}
			<div
				className={`md:hidden transition-[max-height,opacity] duration-300 overflow-hidden ${
					open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="px-6 pb-4 flex flex-col gap-3 text-sm bg-black/80">
					{navItems.map(i => (
						<Link
							key={i.label}
							to={i.to}
							className="py-2 border-b border-white/10 last:border-none opacity-90 hover:opacity-100"
							onClick={() => setOpen(false)}
						>
							{i.label}
						</Link>
					))}
				</div>
			</div>
		</header>
	)
}
