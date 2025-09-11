export default function Navbar() {
	return (
		<nav className="max-w-5xl mx-auto p-4 flex items-center justify-between">
			<span className="font-semibold">My Portfolio</span>
			<div className="space-x-4 text-sm">
				<a href="#about" className="opacity-80 hover:opacity-100">About</a>
				<a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
				<a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
			</div>
		</nav>
	)
}
