// src/sections/about.jsx
// tabs indentation
import { motion, useReducedMotion } from 'framer-motion'

const container = (delay = 0) => ({
	hidden: {},
	show: {
		transition: { delayChildren: delay, staggerChildren: 0.08 },
	},
})

const fadeUp = {
	hidden: { opacity: 0, y: 14 },
	show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const scaleIn = {
	hidden: { opacity: 0, scale: 0.96 },
	show:   { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}

function Tag({ children }) {
	return (
		<span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm 
						  bg-white/5 border border-white/10 text-white/90">
			{children}
		</span>
	)
}

export default function About() {
	const prefersReduced = useReducedMotion()

	return (
		<section id="about" className="relative max-w-5xl mx-auto px-4 py-12">
			{/* subtle divider line at top */}
			<div className="absolute left-0 right-0 top-0 mx-auto h-px w-full max-w-5xl bg-white/10" />

			<motion.div
				variants={container(0.05)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.25 }}
				className="space-y-6"
			>
				{/* Heading */}
				<div className="text-center sm:text-left">
					<motion.h2 variants={fadeUp} className="text-2xl font-semibold mb-2">
						About
					</motion.h2>
					<motion.div
						variants={scaleIn}
						className="h-[2px] w-24 sm:w-28 bg-white/40 mx-auto sm:mx-0"
					/>
				</div>

				{/* Content grid */}
				<motion.div
					variants={container(0.1)}
					className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start"
				>
					{/* Left: bio */}
					<div className="md:col-span-3 space-y-4">
						<motion.p variants={fadeUp} className="opacity-90 leading-relaxed">
							Hi, I’m <span className="font-semibold">Baatyrbek Turatov</span> — a senior at National Louis University
							working toward a B.S. in <span className="font-semibold">Computer Science &amp; Information Systems</span>.
							I love building software that blends technical precision with a bit of playful creativity.
						</motion.p>
						<motion.p variants={fadeUp} className="opacity-90 leading-relaxed">
							My toolkit spans <span className="font-semibold">Java, Python, C/C++, and JavaScript</span> with
							React, Three.js, and Node.js. I also explore{" "}
							<span className="font-semibold">data science &amp; ML</span> (TensorFlow, Pandas, scikit-learn) and
							enjoy turning raw data into useful insights and interactive experiences.
						</motion.p>
						<motion.p variants={fadeUp} className="opacity-90 leading-relaxed">
							Outside of code, I’m leveling up in <span className="font-semibold">DevOps</span> (Docker, GH actions),
							strengthening my database skills (<span className="font-semibold">SQL/NoSQL</span>), and staying curious
							about AI. My goal is simple: keep shipping useful things that solve problems and feel great to use.
						</motion.p>
						<motion.p variants={fadeUp} className="opacity-90 leading-relaxed">
								Currently open to internships and collaborations. If you’ve got an idea worth building,{" "}
								<a href="#contact"
								className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
									let’s talk
								</a>.
						</motion.p>
					</div>

					{/* Right: quick facts / stacks */}
					<div className="md:col-span-2 space-y-3">
						<motion.div variants={scaleIn} className="rounded-2xl border border-white/10 bg-white/5 p-4">
							<h3 className="font-semibold mb-2">Quick facts</h3>
							<ul className="space-y-1.5 text-sm text-white/80">
								<li>🎓 Senior @ National Louis University</li>
								<li>🧠 Focus: Software, Data, ML</li>
								<li>🧰 DevOps: Docker &amp; GH actions</li>
								<li>🗄️ Databases: MongoDB / MySQL</li>
							</ul>
						</motion.div>

						<motion.div variants={scaleIn} className="rounded-2xl border border-white/10 bg-white/5 p-4">
							<h3 className="font-semibold mb-2">Tools I enjoy</h3>
							<div className="flex flex-wrap gap-1">
								<Tag>Java</Tag>
								<Tag>Python</Tag>
								<Tag>C/C++</Tag>
								<Tag>JavaScript</Tag>
								<Tag>React</Tag>
								<Tag>Three.js</Tag>
								<Tag>Node.js</Tag>
								<Tag>TensorFlow</Tag>
								<Tag>Pandas</Tag>
								<Tag>scikit-learn</Tag>
								<Tag>Docker</Tag>
								<Tag>Firebase</Tag>
								<Tag>GitHub Actions</Tag>
								<Tag>MongoDB</Tag>
								<Tag>MySQL</Tag>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	)
}