import { validateAndLogCoordinate } from './coordinate-validator.js';
import { createMarkersWithClustering } from './marker-cluster.js';
import { loadProjectBoundaries } from './boundary-loader.js';

/**
 * Loads project markers from GeoJSON API and adds them to the map
 * @param {L.Map} map - Leaflet map instance
 * @returns {Promise<L.MarkerClusterGroup|null>} The marker cluster group or null on error
 */
export async function loadProjectMarkers(map) {
	try {
		const response = await fetch('/api/geojson');

		if (!response.ok) {
			throw new Error(`HTTP error while fetching geojson. status: ${response.status}`);
		}

		const geojsonData = await response.json();

		if (!geojsonData?.features) {
			console.warn('No features found in GeoJSON data');
			return null;
		}

		const validFeatures = geojsonData.features.filter((feature) => {
			if (!feature.geometry?.coordinates || !feature.properties) {
				return false;
			}

			return validateAndLogCoordinate(feature.geometry.coordinates, feature.properties.projectName);
		});

		console.log(`Valid features: ${validFeatures.length} of ${geojsonData.features.length}`);

		return createMarkersWithClustering(map, validFeatures);
	} catch (error) {
		console.error('Error loading project markers:', error);
		return null;
	}
}

/**
 * Loads both project markers and boundaries
 * @param {L.Map} map - Leaflet map instance
 * @param {Object} options - Loading options
 * @param {string} options.boundariesUrl - URL for GeoJSON boundaries (optional)
 * @returns {Promise<{markers: L.MarkerClusterGroup|null, boundaries: L.GeoJSON|null}>}
 */
export async function loadAllProjectData(map, options = {}) {
	const results = {
		markers: null,
		boundaries: null
	};

	// Load markers first (from database)
	results.markers = await loadProjectMarkers(map);

	// Load boundaries if URL provided
	if (options.boundariesUrl) {
		results.boundaries = await loadProjectBoundaries(map, options.boundariesUrl);
	}

	return results;
}
