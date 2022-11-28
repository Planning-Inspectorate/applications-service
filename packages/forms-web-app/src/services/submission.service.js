const {
	wrappedPostSubmission,
	wrappedPostSubmissionComplete
} = require('../lib/application-api-wrapper');

const postSubmission = async (caseRef, body) => wrappedPostSubmission(caseRef, body);

const postSubmissionComplete = async (submissionsId) =>
	wrappedPostSubmissionComplete(submissionsId);

module.exports = {
	postSubmission,
	postSubmissionComplete
};
