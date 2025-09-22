import Navbar from '../components/navbar.jsx'
import Techback from '../components/techBack.jsx'
import Techcard from '../components/techCard.jsx'

export default function TechPage() {
	return (
		<div className="w-full min-h-screen bg-black text-whiter text-center">
			<Techback />
            <Navbar />
			<h1 className="text-3xl font-bold">My Tech Stack</h1>
			<p className="opacity-80">
				Here I can describe the tools and technologies I use in detail.
			</p>
			<Techcard />
		</div>
	)
}
