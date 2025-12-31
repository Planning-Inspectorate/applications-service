/**
 * OS Maps Token Service (Frontend)
 *
 * Calls backend OAuth service to get map tokens
 * Frontend never handles API credentials directly
 */

const fetch = require('node-fetch');
const uuid = require('uuid');
const config = require('../../config');

const getMapAccessToken = async () => {
	try {
		const response = await fetch(`${config.applications.url}/api/v1/os-maps/token`, {
			method: 'GET',
			headers: {
				'X-Correlation-ID': uuid.v4(),
				'Content-Type': 'application/json'
			},
			timeout: config.applications.timeout
		});

		if (response.status !== 200) {
			throw new Error(`Failed to fetch OS Maps token: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

		if (!data.access_token) {
			throw new Error('No access token in response from OS Maps service');
		}

		return data.access_token;
	} catch (error) {
		console.error('Error fetching OS Maps token:', error);
		throw error;
	}
};

module.exports = { getMapAccessToken };
