const { getSubmissionItemType } = require('../../../../_session/submission-items-session');

const { evidenceOrCommentValues } = require('../../../../evidence-or-comment/config');

const getPersonalInformationWhichName = (i18n, submissionItem) => {
	const submissionItemType = getSubmissionItemType(submissionItem);

	switch (submissionItemType) {
		case evidenceOrCommentValues[2]:
			return i18n.t('examination.checkSubmissionItem.summaryListHeading6');
		case evidenceOrCommentValues[3]:
			return i18n.t('examination.checkSubmissionItem.summaryListHeading7');
		default:
			throw new Error('Submission item type does not match an option');
	}
};

module.exports = { getPersonalInformationWhichName };
