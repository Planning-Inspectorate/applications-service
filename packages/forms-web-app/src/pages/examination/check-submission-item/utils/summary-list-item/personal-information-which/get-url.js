const { getSubmissionItemType } = require('../../../../_session/submission-items-session');

const {
	routesConfig: {
		examination: {
			directory,
			pages: {
				evidenceOrComment,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles
			}
		}
	}
} = require('../../../../../../routes/config');

const getPersonalInformationWhichUrl = (submissionItem) => {
	const submissionItemType = getSubmissionItemType(submissionItem);

	switch (submissionItemType) {
		case evidenceOrComment.options[2].value:
			return `${directory}${personalInformationWhichFiles.route}`;
		case evidenceOrComment.options[3].value:
			return `${directory}${personalInformationWhichCommentFiles.route}`;
		default:
			throw new Error('Submission item type does not match an option');
	}
};

module.exports = { getPersonalInformationWhichUrl };
