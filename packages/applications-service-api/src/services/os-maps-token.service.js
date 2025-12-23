const { StatusCodes } = require('http-status-codes');

const logger = require('../lib/logger');
const { createAxiosInstance } = require('../lib/axios');

const axiosInstance = createAxiosInstance(false);

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

		const response = await axiosInstance.post('https://api.os.uk/oauth2/token/v1', params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			auth: {
				username: apiKey,
				password: apiSecret
			}
		});

		if (response.status !== StatusCodes.OK) {
			throw new Error(`Failed to obtain OAuth token: ${response.statusText}`);
		}

		const { access_token: mapAccessToken } = response.data;

		if (!mapAccessToken) {
			throw new Error('No access token returned from OS Maps OAuth endpoint');
		}

		logger.info('OS Maps OAuth token obtained successfully');

		return mapAccessToken;
	} catch (error) {
		logger.error('Error fetching OS Maps access token:', error);
		throw error;
	}
};

module.exports = { getMapAccessToken };
