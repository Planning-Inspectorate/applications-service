const fetch = require('node-fetch');
const uuid = require('uuid');
const config = require('../../config');

const getApplicationsCSV = async () => {
	const response = await fetch(`${config.applications.url}/api/v1/applications/download`, {
		method: 'GET',
		headers: {
			'X-Correlation-ID': uuid.v4(),
			'Content-Type': 'text/csv'
		}
	});

	if (response.status !== 200) throw new Error('Failed to download Applications CSV');

	const data = await response.text();

	return data;
};

module.exports = { getApplicationsCSV };
