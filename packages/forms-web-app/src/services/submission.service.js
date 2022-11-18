const { wrappedPostSubmission } = require('../lib/application-api-wrapper');

const postSubmission = async (caseRef, body) => wrappedPostSubmission(caseRef, body);

module.exports = {
	postSubmission
};
