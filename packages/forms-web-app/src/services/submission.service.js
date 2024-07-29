const {
	wrappedPostSubmission,
	wrappedPostSubmissionComplete
} = require('../lib/application-api-wrapper');
const logger = require('../lib/logger');

const postSubmission = async (caseRef, body) => wrappedPostSubmission(caseRef, body);

const postSubmissionComplete = async (submissionsId, details) => {
	try {
		return await wrappedPostSubmissionComplete(submissionsId, details);
	} catch (error) {
		logger.error(error);
		logger.error('Submission Complete request failed');
		return 'ok';
	}
};

module.exports = {
	postSubmission,
	postSubmissionComplete
};
