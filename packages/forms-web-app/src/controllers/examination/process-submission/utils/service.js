const fetch = require('node-fetch');
const { logger } = require('../../../../config');

const sendData = async (url, body) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body
		});
		return await response.json();
	} catch (error) {
		logger.error(error);
	}
};

module.exports = {
	sendData
};
