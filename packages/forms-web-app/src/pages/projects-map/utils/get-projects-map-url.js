const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsMapRoute } = require('../config');

/**
 * Get the full URL for the projects map page
 *
 * Constructs the complete URL by combining the origin URL (protocol + domain)
 * with the projects map route. Used for redirects and navigation after form
 * submission.
 *
 * @returns {string} Full projects map URL (e.g., 'https://example.com/projects-map')
 *
 * @example
 * const url = getProjectsMapURL();
 * // Returns: 'https://example.com/projects-map'
 *
 * // Use in POST handler redirects
 * const queryString = queryStringBuilder(body, queryParamsToKeep);
 * res.redirect(getProjectsMapURL() + queryString);
 */
const getProjectsMapURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${projectsMapRoute}`;
};

module.exports = { getProjectsMapURL };
