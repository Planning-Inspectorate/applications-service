const logger = require('../../../../lib/logger');
const config = require('../../../../config');
const { sendData } = require('./service');
const { mapSessionToFormData, getCommentAndFiles } = require('./map-session-to-form-data');

const handleProcessSubmission = async (session) => {
	logger.info('Attempting to post data');

	try {
		const { examination } = session;
		examination.uploading = true;
		const url = `${config.applications.url}/api/v1/submission/${examination.caseRef}`;

		let submissionId;
		for (const item of examination.submissionItems) {
			const formData = mapSessionToFormData(examination, item);
			const listOfCommentAndFiles = getCommentAndFiles(item, formData);
			for (let form of listOfCommentAndFiles) {
				if (submissionId) form.append('submissionId', submissionId);
				const response = await sendData(url, form);
				const data = await response.json();

				submissionId = data.submissionId;
			}
		}
		return 'ok';
	} catch (error) {
		logger.error(error);
	}
};

module.exports = {
	handleProcessSubmission
};
