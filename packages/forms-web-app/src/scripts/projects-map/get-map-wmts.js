'use strict';

const { WMTS_CAPABILITIES_URL, BEARER_TOKEN_PREFIX } = require('./constants');

/**
 * Fetches the OS Maps WMTS GetCapabilities document.
 *
 * @param {string} accessToken OS Maps bearer token
 * @returns {Promise<string>} Raw capabilities XML string
 * @throws {Error} If the HTTP response status is not OK
 */
async function getMapWMTS(accessToken) {
	const response = await fetch(WMTS_CAPABILITIES_URL, {
		headers: { Authorization: BEARER_TOKEN_PREFIX + accessToken }
	});
	if (!response.ok) throw new Error(`WMTS GetCapabilities failed: ${response.status}`);
	return response.text();
}

module.exports = { getMapWMTS };
