const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectSearchRoute } = require('../config');

/**
 * Generate URL to project search view
 * Optionally includes query parameters to persist filters when switching views
 *
 * @param {Object} [query={}] - Query parameters (filters, pagination, etc)
 * @returns {string} URL to project search view with optional query string
 */
const getProjectSearchURL = (query = {}) => {
	const originURL = getOriginURL();
	const baseURL = `${originURL}/${projectSearchRoute}`;

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

module.exports = { getProjectSearchURL };
