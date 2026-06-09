/** Test helper functions for generating random test data used in projects-map tests */

export const NUM_ITERATIONS = 100;

/** Generate a random string with length between minLen and maxLen */
export function randomString(minLen = 1, maxLen = 20) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
	const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
	let result = '';
	for (let i = 0; i < len; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

/** Generate a random project object */
export function randomProject() {
	return {
		caseReference: randomString(5, 12),
		projectName: randomString(3, 30),
		stage: randomString(3, 15)
	};
}

/** Generate an array of random projects */
export function randomProjects(minCount = 1, maxCount = 10) {
	const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
	return Array.from({ length: count }, randomProject);
}

/** Generate a random longitude between -180 and 180 */
export function randomLng() {
	return Math.random() * 360 - 180;
}

/** Generate a random latitude between -90 and 90 */
export function randomLat() {
	return Math.random() * 180 - 90;
}

/** Generate a random GeoJSON Point feature */
export function randomPointFeature() {
	return {
		type: 'Feature',
		geometry: { type: 'Point', coordinates: [randomLng(), randomLat()] },
		properties: {}
	};
}

/** Generate a random GeoJSON Polygon or MultiPolygon feature */
export function randomPolygonFeature() {
	const lng = randomLng();
	const lat = randomLat();
	const dLng = Math.random() * 0.5 + 0.01;
	const dLat = Math.random() * 0.5 + 0.01;
	return {
		type: 'Feature',
		geometry: {
			type: Math.random() > 0.5 ? 'Polygon' : 'MultiPolygon',
			coordinates:
				Math.random() > 0.5
					? [
							[
								[lng, lat],
								[lng + dLng, lat],
								[lng + dLng, lat + dLat],
								[lng, lat + dLat],
								[lng, lat]
							]
					  ]
					: [
							[
								[
									[lng, lat],
									[lng + dLng, lat],
									[lng + dLng, lat + dLat],
									[lng, lat + dLat],
									[lng, lat]
								]
							]
					  ]
		},
		properties: {}
	};
}
