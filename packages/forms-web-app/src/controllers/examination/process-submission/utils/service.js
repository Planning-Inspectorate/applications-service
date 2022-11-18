const fetch = require('node-fetch');
const FormData = require('form-data');

const logger = require('../../../../lib/logger');
const config = require('../../../../config');

const mapSessionToFormData = (examination, item) => {
	const { hasInterestedPartyNo, name, email } = examination;
	const formData = new FormData();
	formData.append('name', name);
	formData.append('email', email);
	formData.append('interestedParty', `${hasInterestedPartyNo === 'yes'}`);
	formData.append('deadline', item.submissionItem);
	formData.append('submissionType', item.submissionType);

	// this gets lifted to loop comments and files one by one.
	if (item.comment) {
		formData.append('representation', item.comment);
	}

	return formData;
};

const sendData = async (session) => {
	logger.info('Attempting to post data');

	try {
		const { examination } = session;
		const url = `${config.applications.url}/api/v1/submission/${examination.caseRef}`;

		let count = 0;
		for (const item of examination.submissionItems) {
			const response = await fetch(url, {
				method: 'POST',
				body: mapSessionToFormData(examination, item)
			});
			const data = await response.json();
			console.log('data', data);
			count++;
		}
		console.log('Count: ', count);
	} catch (error) {
		logger.error(error);
	}
};

module.exports = {
	sendData
};
