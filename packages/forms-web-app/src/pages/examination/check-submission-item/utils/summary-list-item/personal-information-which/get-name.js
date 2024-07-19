const { getSubmissionItemType } = require('../../../../_session/submission-items-session');

const { evidenceOrCommentValues } = require('../../../../evidence-or-comment/config');

const getPersonalInformationWhichName = (submissionItem) => {
	const submissionItemType = getSubmissionItemType(submissionItem);

	switch (submissionItemType) {
		case evidenceOrCommentValues[2]:
			return 'Documents containing personal information';
		case evidenceOrCommentValues[3]:
			return 'Documents or comments containing personal information';
		default:
			throw new Error('Submission item type does not match an option');
	}
};

module.exports = { getPersonalInformationWhichName };
