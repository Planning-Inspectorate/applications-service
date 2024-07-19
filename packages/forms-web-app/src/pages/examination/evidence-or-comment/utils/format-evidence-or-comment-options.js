const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { markActiveChecked } = require('../../_utils/mark-active-checked');
const { getEvidenceOrCommentOptions } = require('../config');

const formatEvidenceOrCommentOptions = (i18n, session) => {
	const evidenceOrCommentOptions = JSON.parse(JSON.stringify(getEvidenceOrCommentOptions(i18n)));
	const formattedEvidenceOrCommentOptions = [
		evidenceOrCommentOptions[1],
		evidenceOrCommentOptions[2],
		evidenceOrCommentOptions[3]
	];
	const { submissionType } = getActiveSubmissionItem(session);

	return submissionType
		? markActiveChecked(formattedEvidenceOrCommentOptions, submissionType)
		: formattedEvidenceOrCommentOptions;
};

module.exports = { formatEvidenceOrCommentOptions };
