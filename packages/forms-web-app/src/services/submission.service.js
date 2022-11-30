const {
	wrappedPostSubmission,
	wrappedPostSubmissionComplete
} = require('../lib/application-api-wrapper');
const logger = require('../lib/logger');

const postSubmission = async (caseRef, body) => wrappedPostSubmission(caseRef, body);

const postSubmissionComplete = async (submissionsId) => {
	try {
		return await wrappedPostSubmissionComplete(submissionsId);
	} catch (error) {
		logger.error(error);
		throw new Error('Submission Complete request failed');
	}
};

module.exports = {
	postSubmission,
	postSubmissionComplete
};
