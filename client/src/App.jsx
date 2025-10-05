import Navbar from './components/home/utils/navbar.jsx'
import Hero3D from './components/home/hero/hero3d.jsx'
import About from './sections/about.jsx'
import Projects from './sections/projects.jsx'
import Contact from './sections/contact.jsx'
import TechStack from './sections/techstack.jsx'

export default function App() {
	return (
		<div className="w-full min-h-screen bg-black text-white">
			<Navbar />
			<Hero3D />
			<About />
			<TechStack />
			<Projects />
			<Contact />
			<footer className="w-full text-center opacity-60 text-xs pb-8">
				© {new Date().getFullYear()} You
			</footer>
		</div>
	)
}