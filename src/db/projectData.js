// src/db/sceneData.js (tabs)
export const scenes = {
	roomTour: {
		stops: [
			{ position: [3.2, 1.7, 4.2], target: [0, 1.2, 0] },
			{ position: [1.6, 1.6, 4.4], target: [0, 1.2, 0] },
			{ position: [-1.6, 1.6, 4.0], target: [0, 1.2, 0] },
			{ position: [-3.6, 1.6, 2.4], target: [0, 1.2, 0] },
			{ position: [-4.0, 1.5, 0.0], target: [0, 1.2, 0] },
			{ position: [-3.2, 1.5, -2.8], target: [0, 1.2, 0] },
			{ position: [0.0, 1.5, -4.2], target: [0, 1.2, 0] },
			{ position: [3.8, 1.5, -2.6], target: [0, 1.2, 0] },
			{ position: [0.8, 4.8, 0.8], target: [0, 0.8, 0] }
		],
		slides: [
			{
				title: 'AgriPredict — Crop–Climate Analysis',
				body: 'Jun 2025 – Sep 2025 • National Louis University. EDA and regression on temperature, humidity, pH, rainfall vs crop suitability; rainfall proved non-linear → suggests advanced models. Skills: NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, EDA, Regression. GitHub: MrSandwick/AgriAnalysis.'
			},
			{
				title: 'Car Dealership Network Security & Infrastructure',
				body: 'Jun 2024 – Sep 2024 • Designed VLAN-segmented network for sales/finance/service/reception with routed core and central server to harden access and streamline data flow. Skills: Network Security, Packet Tracer, VLANs, Routing.'
			},
			{
				title: 'Commercial Product Website',
				body: 'Responsive storefront built with HTML, CSS, SCSS, and JavaScript. Emphasis on clean UX, modular styles, and fast load for product browsing. Skills: HTML, CSS, SCSS, JavaScript, Responsive UI.'
			},
			{
				title: 'File Sorter (Java)',
				body: 'CLI tool that sorts files into subfolders by filename patterns within a target directory. Skills: Java, File Management.'
			},
			{
				title: 'Network Adapter Information Tool',
				body: 'Windows utility using IP Helper API to list network interfaces and traffic stats. Skills: Windows API, Networking, C/C++. GitHub: MrSandwick/Net-Adapter-InfoTool.'
			},
			{
				title: 'Network Monitor (Python)',
				body: 'Monitors network health, checks speeds, and alerts on failures—useful for ISP/5G troubleshooting. Skills: Python, Networking, Monitoring, Automation. GitHub: MrSandwick/-Auto-Net.-Health-Monitor.'
			},
			{
				title: 'Quiz Game (Java)',
				body: 'Console quiz with 5 questions, scoring, feedback, and replay loop. Skills: Java, Git.'
			},
			{
				title: 'User & Group Creation Script',
				body: 'Bash automation to create groups/users, set passwords, and provision home directories with correct permissions. Skills: Linux, Bash, SysAdmin.'
			},
			{
				title: 'gitTool (C)',
				body: 'Lightweight CLI to speed up common Git actions (commit, push, list branches). Skills: C, Git, CLI. GitHub: MrSandwick/gitTool.'
			}
		]
	}
}

export function getScene(id) {
	return scenes[id] || { stops: [], slides: [] }
}
