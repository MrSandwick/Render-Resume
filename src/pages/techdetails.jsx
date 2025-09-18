import Navbar from '../components/navbar.jsx'

export default function TechPage() {
	return (
		<div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <Navbar />
			<h1 className="text-3xl font-bold mb-6">My Tech Stack</h1>
			<p className="opacity-80 mb-6">
				Here you can describe the tools and technologies you use in detail.
				Add sections, screenshots, or project links.
			</p>
		</div>
	)
}
