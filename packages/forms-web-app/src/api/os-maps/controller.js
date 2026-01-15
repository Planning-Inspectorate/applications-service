/**
 * OS Maps OAuth Token Controller
 *
 * Handles OAuth token generation for direct map tile requests from the browser.
 * Converts API credentials to Bearer tokens for frontend map tile requests.
 */

const { getMapAccessToken } = require('../_services/os-maps-token-oauth.service');
const logger = require('../../lib/logger');

/**
 * GET /api/os-maps/token
 *
 * Returns an OAuth Bearer token for direct browser requests to OS Maps API.
 * Called once per page load to obtain token for tile requests.
 *
 * @returns {Object} { access_token, token_type, expires_in }
 */
const getOSMapsToken = async (req, res) => {
	try {
		const tokenData = await getMapAccessToken();

		res.json({
			access_token: tokenData.access_token,
			token_type: tokenData.token_type,
			expires_in: tokenData.expires_in
		});
	} catch (error) {
		logger.error('Failed to obtain OS Maps token', { error: error.message });

		res.status(500).json({
			error: 'Failed to obtain OS Maps token',
			message: error.message
		});
	}
};

module.exports = { getOSMapsToken };
