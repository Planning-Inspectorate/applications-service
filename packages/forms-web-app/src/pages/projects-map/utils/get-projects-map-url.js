const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsMapRoute } = require('../config');

/**
 * Generate URL to projects map view
 * Optionally includes query parameters to persist filters when switching views
 *
 * @param {Object} [query={}] - Query parameters (filters, pagination, etc)
 * @returns {string} URL to projects map view with optional query string
 */
const getProjectsMapURL = (query = {}) => {
	const originURL = getOriginURL();
	const baseURL = `${originURL}/${projectsMapRoute}`;

	// If query parameters provided, append them as query string
	const queryParams = Object.keys(query).filter((key) => query[key] !== undefined);
	if (queryParams.length === 0) {
		return baseURL;
	}

	const queryString = queryParams
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
		.join('&');

	return `${baseURL}?${queryString}`;
};

module.exports = { getProjectsMapURL };
