/**
 * OS Maps OAuth Token Service
 *
 * Handles OAuth client credentials flow with OS Maps API
 * Converts API credentials to Bearer tokens for map tile requests
 */

const fetch = require('node-fetch');
const logger = require('../../lib/logger');
const https = require('https');

const getMapAccessToken = async () => {
	try {
		const apiKey = process.env.OS_MAPS_API_KEY;
		const apiSecret = process.env.OS_MAPS_API_SECRET;

		if (!apiKey || !apiSecret) {
			throw new Error(
				'OS Maps API credentials not configured. Set OS_MAPS_API_KEY and OS_MAPS_API_SECRET environment variables.'
			);
		}

		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');

		// In development, Docker containers may not have proper CA certificate setup
		// Create agent with disabled verification only for development (production uses strict verification by default)
		const agent =
			process.env.NODE_ENV === 'production'
				? undefined
				: new https.Agent({ rejectUnauthorized: false });

		const response = await fetch('https://api.os.uk/oauth2/token/v1', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`
			},
			body: params,
			...(agent && { agent })
		});

		if (response.status !== 200) {
			const errorText = await response.text();
			throw new Error(
				`Failed to obtain OAuth token: ${response.status} ${response.statusText} - ${errorText}`
			);
		}

		// Parse OAuth token response which contains { access_token, token_type, expires_in }
		const tokenResponse = await response.json();
		const mapAccessToken = tokenResponse.access_token;

		if (!mapAccessToken) {
			throw new Error('No access token returned from OS Maps OAuth endpoint');
		}

		logger.info('OS Maps OAuth token obtained successfully');

		return mapAccessToken;
	} catch (error) {
		logger.error({
			msg: 'Error fetching OS Maps access token',
			error: error.message,
			stack: error.stack
		});
		throw error;
	}
};

module.exports = { getMapAccessToken };
