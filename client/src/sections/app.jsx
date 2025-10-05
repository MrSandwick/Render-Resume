import Navbar from './components/Navbar.jsx'
import Hero3D from './components/Hero3D.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
	return (
		<div className="min-h-screen bg-black text-white">
			<Navbar />
			<Hero3D />
			<About />
			<Projects />
			<Contact />
			<footer className="text-center opacity-60 text-xs pb-8">
				© {new Date().getFullYear()} You
			</footer>
		</div>
	)
}
