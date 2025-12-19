const { maps: mapsConfig } = require('../../../config');

const getMapAccessToken = async () => {
	try {
		if (!mapsConfig.osMapsApiKey || !mapsConfig.osMapsApiSecret) {
			console.error('OS Maps API credentials not configured:', {
				hasApiKey: !!mapsConfig.osMapsApiKey,
				hasApiSecret: !!mapsConfig.osMapsApiSecret
			});
			return null;
		}

		const authString = Buffer.from(
			mapsConfig.osMapsApiKey + ':' + mapsConfig.osMapsApiSecret
		).toString('base64');

		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');

		const authResponse = await fetch('https://api.os.uk/oauth2/token/v1', {
			method: 'POST',
			body: params,
			headers: {
				Authorization: 'Basic ' + authString
			}
		});

		const responseData = await authResponse.json();

		if (!authResponse.ok) {
			console.error('OS Maps API error response:', {
				status: authResponse.status,
				statusText: authResponse.statusText,
				body: responseData
			});
			return null;
		}

		const { access_token: mapAccessToken } = responseData;

		if (!mapAccessToken) {
			console.error('No access_token in response:', responseData);
			throw new Error('Failed to retrieve map access token from OS Maps API');
		}

		return mapAccessToken;
	} catch (error) {
		console.error('Error fetching map access token:', error);
		return null;
	}
};

module.exports = { getMapAccessToken };
