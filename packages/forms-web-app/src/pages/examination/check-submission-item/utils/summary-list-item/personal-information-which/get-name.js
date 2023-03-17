const { getSubmissionItemType } = require('../../../../_session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment }
		}
	}
} = require('../../../../../../routes/config');

const getPersonalInformationWhichName = (submissionItem) => {
	const submissionItemType = getSubmissionItemType(submissionItem);

	switch (submissionItemType) {
		case evidenceOrComment.options[2].value:
			return 'Documents containing personal information';
		case evidenceOrComment.options[3].value:
			return 'Documents or comments containing personal information';
		default:
			throw new Error('Submission item type does not match an option');
	}
};

module.exports = { getPersonalInformationWhichName };
