const { getSubmissionItemType } = require('../../../../_session/submission-items-session');

const { evidenceOrCommentValues } = require('../../../../evidence-or-comment/config');
const {
	routesConfig: {
		examination: {
			pages: { personalInformationWhichCommentFiles, personalInformationWhichFiles }
		}
	}
} = require('../../../../../../routes/config');

const getPersonalInformationWhichUrl = (submissionItem) => {
	const submissionItemType = getSubmissionItemType(submissionItem);

	switch (submissionItemType) {
		case evidenceOrCommentValues[2]:
			return `${personalInformationWhichFiles.route}`;
		case evidenceOrCommentValues[3]:
			return `${personalInformationWhichCommentFiles.route}`;
		default:
			throw new Error('Submission item type does not match an option');
	}
};

module.exports = { getPersonalInformationWhichUrl };
