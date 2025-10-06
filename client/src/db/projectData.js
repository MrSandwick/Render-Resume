// src/db/projectData.js

/** @typedef {[number, number, number]} Vec3 */

export const scenes = {
	roomTour: {
		/** @type {{ position: Vec3, target: Vec3 }[]} */
		stops: [
			{ position: [3.2, 1.7, 4.2], target: [0, 1.2, 0] },
			{ position: [1.6, 1.6, 4.4], target: [0, 1.2, 0] },
			{ position: [1.6, 1.6, 4.0], target: [0, 1.2, 0] },
			{ position: [3.6, 1.6, 2.4], target: [0, 1.2, 0] },
			{ position: [4.0, -0.5, 0.0], target: [0, 1.2, 0] },
			{ position: [3.2, 0.5, -2.8], target: [0, 1.2, 0] },
			{ position: [1.0, 0.5, -4.2], target: [0, 1.2, 0] },
			{ position: [3.8, 1.5, -2.6], target: [0, 1.2, 0] },
			{ position: [0.8, 4.8, 0.8], target: [0, 0.8, 0] }
		],
		// slides now come from Mongo—keep this empty
		slides: []
	}
}

/** @param {keyof typeof scenes} id */
export function getScene(id) {
	return scenes[id] || { stops: [], slides: [] }
}
