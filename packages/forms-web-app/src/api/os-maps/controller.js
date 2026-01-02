/**
 * OS Maps OAuth Token Controller
 *
 * Handles OAuth token generation for map tile proxying
 * Converts API credentials to Bearer tokens for frontend map requests
 */

const { getMapAccessToken } = require('../_services/os-maps-token-oauth.service');
const logger = require('../../lib/logger');

/**
 * GET /api/os-maps/token
 *
 * Returns an OAuth Bearer token for use by map tile proxy.
 * This endpoint is for frontend/external use.
 * Backend services should import os-maps-token-oauth.service.js directly.
 *
 * @returns {Object} { access_token, token_type, expires_in }
 */
const getOSMapsToken = async (req, res) => {
	try {
		const token = await getMapAccessToken();

		res.json({
			access_token: token,
			token_type: 'Bearer'
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
