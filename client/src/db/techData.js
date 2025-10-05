export const TECH_ITEMS = [
	// Programming & Development
	{ name: "Java",		category: "Programming & Development",	desc: "OOP, backend apps",				icon: "☕" },
	{ name: "Python",	category: "Programming & Development",	desc: "General-purpose, scripting",		icon: "🐍" },
	{ name: "Flask",	category: "Programming & Development",	desc: "Python micro web framework",		icon: "🧪" },
	{ name: "C++",		category: "Programming & Development",	desc: "Systems, performance apps",		icon: "💽" },
	{ name: "C",		category: "Programming & Development",	desc: "Low-level programming",			icon: "⚙️" },
	{ name: "JavaScript",	category: "Programming & Development",	desc: "ESNext, language fundamentals",	icon: "🟨" },
	{ name: "React",	category: "Programming & Development",	desc: "SPA, hooks, context, routing",	icon: "⚛️" },
	{ name: "Three.js",	category: "Programming & Development",	desc: "WebGL 3D, @react-three/fiber",	icon: "🧊" },
	{ name: "Vite",		category: "Programming & Development",	desc: "Fast dev server & bundler",		icon: "⚡" },
	{ name: "Node.js",	category: "Programming & Development",	desc: "Backend runtime, tooling, scripts",	icon: "🟩" },
	{ name: "HTML5",	category: "Programming & Development",	desc: "Markup, semantics",				icon: "📄" },
	{ name: "CSS3",		category: "Programming & Development",	desc: "Styling, modern CSS features",		icon: "🎨" },
	{ name: "SCSS",		category: "Programming & Development",	desc: "CSS preprocessor (superset)",		icon: "🧾" },
	{ name: "SASS",		category: "Programming & Development",	desc: "CSS preprocessor (indented syntax)",	icon: "📝" },
	{ name: "Tailwind CSS",category: "Programming & Development",	desc: "Utility-first, responsive UI",	icon: "🧵" },

	// Data Science & Machine Learning
	{ name: "Pandas",	category: "Data Science & Machine Learning",	desc: "Dataframes, analysis",			icon: "🐼" },
	{ name: "NumPy",	category: "Data Science & Machine Learning",	desc: "Arrays, numerical computing",	icon: "🔢" },
	{ name: "Matplotlib",	category: "Data Science & Machine Learning",	desc: "Charts, visualizations",			icon: "📊" },
	{ name: "Seaborn",	category: "Data Science & Machine Learning",	desc: "Statistical plots",				icon: "🌊" },
	{ name: "Scikit-Learn",category: "Data Science & Machine Learning",	desc: "ML pipelines, metrics",			icon: "📈" },
	{ name: "TensorFlow",	category: "Data Science & Machine Learning",	desc: "Deep learning, RNN, LSTM, NLP",	icon: "🧠" },
	{ name: "Data Visualization",category: "Data Science & Machine Learning",	desc: "Present insights visually",		icon: "📉" },
	{ name: "Linear Regression",category: "Data Science & Machine Learning",	desc: "Predictive modeling",			icon: "➗" },
	{ name: "Machine Learning",category: "Data Science & Machine Learning",	desc: "ML concepts & algorithms",		icon: "🤖" },

	// Databases
	{ name: "MySQL",	category: "Databases",	desc: "Relational DBMS, queries",		icon: "🗄️" },
	{ name: "SQL",		category: "Databases",	desc: "Structured Query Language",		icon: "📜" },
	{ name: "Relational Databases",category: "Databases",	desc: "Schema design, normalization",	icon: "🔗" },
	{ name: "DBMS",		category: "Databases",	desc: "Database management systems",	icon: "💾" },
	{ name: "Microsoft Access",category: "Databases",	desc: "Data entry, queries",			icon: "📂" },

	// Cloud & DevOps
	{ name: "Docker",	category: "Cloud & DevOps",	desc: "Containers, images",			icon: "🐳" },
	{ name: "Docker Compose",category: "Cloud & DevOps",	desc: "Multi-container apps",			icon: "🧩" },
	{ name: "Kubernetes",	category: "Cloud & DevOps",	desc: "Orchestration, scaling",		icon: "☸️" },
	{ name: "Jenkins",	category: "Cloud & DevOps",	desc: "CI automation",				icon: "🛠️" },
	{ name: "CI/CD",	category: "Cloud & DevOps",	desc: "Continuous integration & delivery",icon: "🔄" },
	{ name: "AWS",		category: "Cloud & DevOps",	desc: "Lambda, S3, CloudWatch",		icon: "☁️" },

	// Networking & Security
	{ name: "Wireshark",	category: "Networking & Security",	desc: "Packet analysis",			icon: "🦈" },
	{ name: "Cisco Packet Tracer",category: "Networking & Security",	desc: "Network simulation",			icon: "📡" },
	{ name: "Network Architecture & Security",category: "Networking & Security",	desc: "Design & secure networks",	icon: "🔒" },

	// Software Engineering Concepts
	{ name: "OOP",		category: "Software Engineering Concepts",	desc: "Object-oriented programming",	icon: "📘" },
	{ name: "Data Structures & Algorithms",category: "Software Engineering Concepts",	desc: "DSA foundations",			icon: "🧮" },
	{ name: "Software Design Patterns",category: "Software Engineering Concepts",	desc: "Reusable solutions",			icon: "📐" },
	{ name: "Responsive Web Design",category: "Software Engineering Concepts",	desc: "Mobile-first, adaptive layouts",	icon: "📱" },

	// Tools & Environments
	{ name: "Git",		category: "Tools & Environments",	desc: "Version control",			icon: "🔧" },
	{ name: "GitHub",	category: "Tools & Environments",	desc: "Collaboration & repos",		icon: "🐙" },
	{ name: "Jupyter Notebook",category: "Tools & Environments",	desc: "Interactive coding",			icon: "📓" },
	{ name: "Anaconda",	category: "Tools & Environments",	desc: "Package & env manager",		icon: "📦" },
	{ name: "VS Code",	category: "Tools & Environments",	desc: "Editor, extensions",			icon: "🖥️" },
	{ name: "IntelliJ IDEA",category: "Tools & Environments",	desc: "Java IDE",					icon: "💡" },
	{ name: "Linux Systems",category: "Tools & Environments",	desc: "Unix tools, scripting",		icon: "🐧" },

	// Project & Process Management
	{ name: "Agile",	category: "Project & Process Management",	desc: "Iterative development",		icon: "⚡" },
	{ name: "Scrum",	category: "Project & Process Management",	desc: "Team framework",				icon: "🏉" },
	{ name: "Project Management",category: "Project & Process Management",	desc: "Planning & execution",		icon: "📂" },

	// Soft Skills
	{ name: "Team Collaboration",category: "Soft Skills",	desc: "Work well in teams",			icon: "🤝" },
	{ name: "Debugging & Troubleshooting",category: "Soft Skills",	desc: "Problem-solving mindset",		icon: "🔍" },
	{ name: "Leadership",category: "Soft Skills",	desc: "Guiding projects & people",		icon: "⭐" }
];

export const TECH_CATEGORIES = [
	"All",
	"Programming & Development",
	"Data Science & Machine Learning",
	"Databases",
	"Cloud & DevOps",
	"Networking & Security",
	"Software Engineering Concepts",
	"Tools & Environments",
	"Project & Process Management",
	"Soft Skills"
];
