// tabs indentation
// src/db/sphereIcons.js

export const SPHERE_ICONS = [
	{ id: 'threejs',		src: 'icons/threejs.svg',		scale: 0.9 },
	{ id: 'tailwind',		src: 'icons/tailwind.png',		scale: 0.85 },
	{ id: 'docker',			src: 'icons/docker.png',		scale: 0.9 },
	{ id: 'nodejs',			src: 'icons/nodejs.png',		scale: 0.9 },
	{ id: 'git',			src: 'icons/git.png',			scale: 0.85 },
	{ id: 'html',			src: 'icons/html.png',			scale: 0.85 },
	{ id: 'css',			src: 'icons/css.png',			scale: 0.85 },
	{ id: 'javascript',		src: 'icons/javascript.png',	scale: 0.85 },
	{ id: 'python',			src: 'icons/python.png',		scale: 0.85 },
]

// handy strings-only list (e.g., for Background component)
export const SPHERE_ICON_SRCS = SPHERE_ICONS.map(i => i.src)
