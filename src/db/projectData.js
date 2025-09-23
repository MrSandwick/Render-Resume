/** 
 * @typedef {Object} ProjectLink
 * @property {string} label
 * @property {string} href
 */

/** 
 * @typedef {Object} ProjectSlide
 * @property {string} id
 * @property {string} title
 * @property {string|null} associated
 * @property {{ start?: string, end?: string }|null} date // YYYY-MM
 * @property {string|null} dateLabel
 * @property {string} description
 * @property {string[]} skills
 * @property {string[]} features
 * @property {ProjectLink[]} links
 */

/** 
 * @typedef {Object} Scene
 * @property {Array<{ position: [number,number,number], target: [number,number,number] }>} stops
 * @property {ProjectSlide[]} slides
 */

/** @type {{ [sceneId: string]: Scene }} */

export const scenes = {
	roomTour: {
		stops: [
			{ position: [3.2, 1.7, 4.2], target: [0, 1.2, 0] }, //[range, camera view angle y, camera view angle x]
			{ position: [1.6, 1.6, 4.4], target: [0, 1.2, 0] },
			{ position: [1.6, 1.6, 4.0], target: [0, 1.2, 0] },
			{ position: [3.6, 1.6, 2.4], target: [0, 1.2, 0] }, 
			{ position: [4.0, -0.5, 0.0], target: [0, 1.2, 0] },
			{ position: [3.2, 0.5, -2.8], target: [0, 1.2, 0] }, 
			{ position: [1.0, 0.5, -4.2], target: [0, 1.2, 0] },
			{ position: [3.8, 1.5, -2.6], target: [0, 1.2, 0] }, 
			{ position: [0.8, 4.8, 0.8], target: [0, 0.8, 0] }
		],
		slides: [
			{
				id: 'agripredict',
				title: 'AgriPredict — Crop–Climate Analysis',
				associated: 'National Louis University',
				date: { start: '2025-06', end: '2025-09' },
				dateLabel: 'Jun 2025 – Sep 2025',
				description:
					'Exploratory data analysis and regression on temperature, humidity, soil pH, and rainfall vs. crop suitability. Found rainfall effects to be non-linear, motivating more advanced models.',
				skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-Learn', 'EDA', 'Regression'],
				features: [
					'Correlation profiling across climate & soil variables',
					'Baseline linear models with diagnostics',
					'Insight: rainfall shows non-linear influence on yield/suitability',
					'Clear visuals for feature relationships'
				],
				links: [
					{ label: 'GitHub', href: 'https://github.com/MrSandwick/AgriAnalysis' },
					{ label: 'Report', href: '../public/files/AgriPredict_Rep.pdf'}
				]
			},
			{
				id: 'car-dealership-network',
				title: 'Car Dealership Network Security & Infrastructure',
				associated: null,
				date: { start: '2024-06', end: '2024-09' },
				dateLabel: 'Jun 2024 – Sep 2024',
				description:
					'Designed a VLAN-segmented network for sales, finance, service, and reception with a routed core and centralized servers to harden access and streamline data flow.',
				skills: ['Network Security', 'Cisco Packet Tracer', 'VLANs', 'Routing'],
				features: [
					'Role-based segmentation (sales/finance/service/reception)',
					'Inter-VLAN routing with ACL hardening',
					'Centralized services and simplified traffic paths'
				],
				links: [
					{ label: 'Report', href: '../public/files/CarDealership_Rep.pdf'}
				]
			},
			{
				id: 'commercial-product-website',
				title: 'Commercial Product Website',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'Responsive storefront with clean UX, modular SCSS architecture, and fast load times for smooth product browsing.',
				skills: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'Responsive UI'],
				features: [
					'Mobile-first responsive layout',
					'Modular SCSS with reusable components',
					'Performance-minded asset strategy'
				],
				links: [
					{label: 'Page', href:'https://mrsandwick.github.io/CommercialProduct/'},
					{label: 'Github', href:'https://github.com/MrSandwick/CommercialProduct'}
				]
			},
			{
				id: 'file-sorter-java',
				title: 'File Sorter (Java)',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'CLI utility that sorts files into subfolders by filename patterns within a target directory.',
				skills: ['Java', 'File I/O'],
				features: ['Pattern-based categorization', 'Configurable target directory', 'Console feedback/logging'],
				links: [{ label: 'Github', href:'https://github.com/MrSandwick/FileSorter'}]
			},
			{
				id: 'net-adapter-info',
				title: 'Network Adapter Information Tool',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'Windows utility using the IP Helper API to list network interfaces and basic traffic statistics.',
				skills: ['C', 'C++', 'Windows API', 'Networking'],
				features: ['Enumerates network adapters', 'Displays link/traffic stats', 'Uses Windows IP Helper (iphlpapi)'],
				links: [{ label: 'GitHub', href: 'https://github.com/MrSandwick/Net-Adapter-InfoTool' }]
			},
			{
				id: 'network-monitor-python',
				title: 'Network Monitor (Python)',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'Monitors network health, checks speeds, and alerts on failures—useful for ISP/5G troubleshooting.',
				skills: ['Python', 'Networking', 'Monitoring', 'Automation'],
				features: ['Periodic connectivity checks', 'Speed/bandwidth probes', 'Failure/latency alerting workflow'],
				links: [{ label: 'GitHub', href: 'https://github.com/MrSandwick/-Auto-Net.-Health-Monitor' }]
			},
			{
				id: 'quiz-game-java',
				title: 'Quiz Game (Java)',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'Console quiz with five questions, scoring, instant feedback, and a replay loop.',
				skills: ['Java', 'Git'],
				features: ['Five Q&A rounds', 'Score tracking', 'Replay without restart'],
				links: [{label: 'GitHub', href: 'https://github.com/MrSandwick/QuizGame'}]
			},
			{
				id: 'user-group-script',
				title: 'User & Group Creation Script',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'Bash automation to create groups and users, set passwords, and provision home directories with correct permissions.',
				skills: ['Linux', 'Bash', 'SysAdmin'],
				features: ['Batch user/group creation', 'Home directory provisioning', 'Secure permissions defaults'],
				links: [{ label: 'GitHub', href: 'https://github.com/MrSandwick/User-and-Group-Management-Script' }]
			},
			{
				id: 'gittool-c',
				title: 'gitTool (C)',
				associated: null,
				date: null,
				dateLabel: null,
				description:
					'Lightweight CLI wrapper to speed up common Git actions (commit, push, list branches).',
				skills: ['C', 'Git', 'CLI'],
				features: ['Quick commits', 'Branch listing', 'One-liner pushes'],
				links: [{ label: 'GitHub', href: 'https://github.com/MrSandwick/gitTool' }]
			}
		]
	}
}

/** @param {keyof typeof scenes} id */
export function getScene(id) {
	return scenes[id] || { stops: [], slides: [] }
}
