/**
 * Get OS Maps OAuth token for server-side rendering
 *
 * This module is used by server-side controllers to obtain OAuth tokens
 * for passing to map views. It imports the OAuth service directly since this
 * runs on the Node.js backend, not through HTTP.
 */

const {
	getMapAccessToken: getOAuthToken
} = require('../api/_services/os-maps-token-oauth.service');
const logger = require('../lib/logger');

const getMapAccessToken = async () => {
	try {
		return await getOAuthToken();
	} catch (error) {
		logger.error({
			msg: 'Error fetching OS Maps token for server-side rendering',
			error: error.message,
			stack: error.stack
		});
		throw error;
	}
};

module.exports = { getMapAccessToken };
