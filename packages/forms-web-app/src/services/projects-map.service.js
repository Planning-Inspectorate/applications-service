const {
	getProjectsMapGeoJSON: getProjectsMapGeoJSONFromAPI
} = require('../lib/application-api-wrapper');
const { queryStringBuilder } = require('../utils/query-string-builder');

const GEOJSON_QUERY_PARAMS = ['searchTerm', 'region', 'sector', 'stage'];

/**
 * Fetches GeoJSON FeatureCollection of projects from the API for map rendering.
 * Accepts filter query params (region, sector, stage, searchTerm).
 * Projects without coordinates are excluded server-side — see applications.geojson.js (IDAS-40).
 *
 * @param {Object} query - Express query object
 * @returns {Promise<{type: string, features: Array}>} GeoJSON FeatureCollection
 */
const getProjectsMapGeoJSON = async (query = {}) => {
	const queryString = queryStringBuilder(query, GEOJSON_QUERY_PARAMS);
	const response = await getProjectsMapGeoJSONFromAPI(queryString);

	if (response.resp_code !== 200) {
		throw new Error('Projects map GeoJSON response status not 200');
	}

	return response.data;
};

module.exports = { getProjectsMapGeoJSON };
