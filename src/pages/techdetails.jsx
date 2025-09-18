import Navbar from '../components/navbar.jsx'

export default function TechPage() {
	return (
		<div className="w-full min-h-screen bg-black text-whiter text-center">
            <Navbar />
			<h1 className="text-3xl font-bold">My Tech Stack</h1>
			<p className="opacity-80">
				Here you can describe the tools and technologies you use in detail.
				Add sections, screenshots, or project links.
			</p>
		</div>
	)
}
