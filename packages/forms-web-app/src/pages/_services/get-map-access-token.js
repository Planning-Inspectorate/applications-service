const { default: fetch } = require('node-fetch');
const { maps } = require('../../config');
const logger = require('../../lib/logger');

const getMapAccessToken = async () => {
	try {
		const authString = Buffer.from(maps.osMapsApiKey + ':' + maps.osMapsApiSecret).toString(
			'base64'
		);

		const params = new URLSearchParams();
		params.append('grant_type', 'client_credentials');

		const authResponse = await fetch('https://api.os.uk/oauth2/token/v1', {
			method: 'POST',
			body: params,
			headers: {
				Authorization: 'Basic ' + authString
			}
		});

		const { access_token } = await authResponse.json();

		if (!access_token) throw new Error('Map access token is undefined');

		return access_token;
	} catch (error) {
		logger.error(error);
	}
};

module.exports = { getMapAccessToken };
