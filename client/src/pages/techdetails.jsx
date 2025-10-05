import Navbar from '../components/home/utils/navbar.jsx'
import Techback from '../components/tech/techback.jsx'
import Techcard from '../components/tech/techcard.jsx'
import ScrollTopButton from '../components/comm/scrolltop.jsx'

export default function TechPage() {
	return (
		<div className="relative w-full min-h-screen  bg-black text-whiter text-center">
			<Navbar />
			<Techback />
			<h1 className="text-3xl font-bold">My Tech Stack</h1>
			<p className="opacity-80">
				Here I can describe the tools and technologies I use in detail.
			</p>
			<Techcard />

			<ScrollTopButton />
		</div>
	)
}
