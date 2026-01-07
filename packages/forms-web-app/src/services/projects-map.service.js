const { projectStages } = require('../utils/project-stages');
const { getAllProjectList } = require('../lib/application-api-wrapper');

/**
 * Fetches and transforms projects to GeoJSON format
 *
 * @returns {Promise<Object>} GeoJSON FeatureCollection
 * @throws {Error} If projects cannot be fetched
 */
const getProjectsMapGeoJSON = async () => {
	const projectsResponse = await getAllProjectList();

	if (!projectsResponse || !projectsResponse.data) {
		throw new Error('Failed to fetch projects from database');
	}

	const applications = projectsResponse.data.applications || projectsResponse.data;
	return transformProjectsToGeoJSON(applications);
};

/**
 * Transforms raw application data to GeoJSON FeatureCollection format
 *
 * Used by both page controller and API endpoint.
 * Single source of truth for data transformation.
 *
 * Features:
 * - Validates coordinate format and values
 * - Filters out invalid entries
 * - Maps property names to GeoJSON standard format
 * - Translates internal IDs to display values
 *
 * @param {Array} applications - Raw applications from backend API
 * @returns {Object} GeoJSON FeatureCollection with validated features
 */
const transformProjectsToGeoJSON = (applications) => {
	if (!Array.isArray(applications)) {
		return { type: 'FeatureCollection', features: [] };
	}

	const features = applications
		.filter((app) => {
			// Validate that LongLat exists and has proper format
			if (!app.LongLat || !Array.isArray(app.LongLat) || app.LongLat.length !== 2) {
				return false;
			}

			// Parse and validate coordinates
			const lat = parseFloat(app.LongLat[1]);
			const lng = parseFloat(app.LongLat[0]);

			// Ensure coordinates are valid numbers
			if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
				return false;
			}

			// Validate geographic bounds (latitude: -90 to 90, longitude: -180 to 180)
			return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
		})
		.map((app) => ({
			type: 'Feature',
			geometry: {
				type: 'Point',
				coordinates: [parseFloat(app.LongLat[0]), parseFloat(app.LongLat[1])]
			},
			properties: {
				caseRef: app.CaseReference,
				projectName: app.ProjectName,
				stage: projectStages[app.Stage] || app.Stage,
				summary: app.Summary,
				region: app.Region
			}
		}));

	return {
		type: 'FeatureCollection',
		features
	};
};

module.exports = {
	getProjectsMapGeoJSON,
	transformProjectsToGeoJSON
};
