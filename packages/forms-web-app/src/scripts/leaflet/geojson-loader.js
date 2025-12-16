import { validateAndLogCoordinate } from './coordinate-validator.js';
import { createMarkersWithClustering } from './marker-cluster.js';

/** @typedef {Object} GeoJSONFeature - GeoJSON feature with geometry and properties
 * @property {Object} geometry - Feature geometry
 * @property {Coordinates} geometry.coordinates - Feature coordinates
 * @property {ProjectProperties} properties - Feature properties
 */

/**
 * Loads project markers from GeoJSON API and adds them to the map
 * @param {L.Map} map - Leaflet map instance
 */
export async function loadProjectMarkers(map) {
	try {
		/** @type {Response} */
		const response = await fetch('/api/geojson');

		if (!response.ok) {
			throw new Error(`HTTP error while fetching geojson. status: ${response.status}`);
		}

		/** @type {Object} */
		const geojsonData = await response.json();

		if (!geojsonData?.features) {
			console.warn('No features found in GeoJSON data');
			return;
		}

		/** @type {GeoJSONFeature[]} */
		const validFeatures = geojsonData.features.filter((feature) => {
			if (!feature.geometry?.coordinates || !feature.properties) {
				return false;
			}

			return validateAndLogCoordinate(feature.geometry.coordinates, feature.properties.projectName);
		});

		console.log('Valid features:', validFeatures.length);
		console.log(
			'Sample coordinates:',
			validFeatures
				.slice(0, 5)
				.map((f) => ({ name: f.properties.projectName, coords: f.geometry.coordinates }))
		);

		// Check for duplicates manually
		const coordMap = new Map();
		validFeatures.forEach((feature) => {
			const key = feature.geometry.coordinates.join(',');
			if (!coordMap.has(key)) {
				coordMap.set(key, []);
			}
			coordMap.get(key).push(feature.properties.projectName);
		});

		const duplicates = Array.from(coordMap.entries()).filter(([, projects]) => projects.length > 1);
		console.log('Duplicate coordinates found:', duplicates);

		// Create markers with clustering for overlapping locations
		createMarkersWithClustering(map, validFeatures);

		console.log(`Loaded ${validFeatures.length} of ${geojsonData.features.length} project markers`);
	} catch (error) {
		console.error('Error loading project markers:', error);
	}
}
