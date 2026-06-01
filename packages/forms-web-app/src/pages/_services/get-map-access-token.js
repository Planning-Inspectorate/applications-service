const { default: fetch } = require('node-fetch');
const { maps } = require('../../config');
const logger = require('../../lib/logger');

const getMapAccessToken = async () => {
	try {
		logger.info('[map-token] Starting OS Maps token fetch');
		const authString = Buffer.from(maps.osMapsApiKey + ':' + maps.osMapsApiSecret).toString(
			'base64'
		);

		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');

		logger.info('[map-token] Calling OS Maps OAuth API');
		const authResponse = await fetch('https://api.os.uk/oauth2/token/v1', {
			method: 'POST',
			body: params,
			headers: {
				Authorization: 'Basic ' + authString
			}
		});

		logger.info(`[map-token] OS Maps OAuth API response status: ${authResponse.status}`);

		const { access_token } = await authResponse.json();

		if (!access_token) {
			logger.error('[map-token] Map access token is undefined, API response may have failed');
			throw new Error('Map access token is undefined');
		}

		logger.info('[map-token] Successfully obtained OS Maps access token');
		return access_token;
	} catch (error) {
		logger.error('[map-token] Failed to get map access token:', error.message, error.stack);
	}
};

module.exports = { getMapAccessToken };
