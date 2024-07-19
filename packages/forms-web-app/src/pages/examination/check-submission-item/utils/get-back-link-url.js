const {
	getSubmissionItemType,
	getSubmissionItemPersonalInformation,
	getActiveSubmissionItemFiles,
	getActiveSubmissionItem
} = require('../../_session/submission-items-session');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const { evidenceOrCommentValues } = require('../../evidence-or-comment/config');
const {
	routesConfig: {
		examination: {
			pages: {
				addAnotherDeadlineItem,
				personalInformation,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles
			}
		}
	}
} = require('../../../../routes/config');

const getOptionTwoBackLinkUrl = (submissionItemFilesLength, hasPersonalInformation) =>
	submissionItemFilesLength > 1 && hasPersonalInformation
		? `${personalInformationWhichFiles.route}`
		: `${personalInformationFiles.route}`;

const getOptionThreeBackLinkUrl = (hasPersonalInformation) =>
	hasPersonalInformation
		? `${personalInformationWhichCommentFiles.route}`
		: `${personalInformationCommentFiles.route}`;

const getBackLinkUrl = (query, session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const submissionItemType = getSubmissionItemType(activeSubmissionItem);
	const hasPersonalInformation =
		getSubmissionItemPersonalInformation(activeSubmissionItem) ===
		personalInformation.options[1].value;

	let backLinkUrl;

	if (isQueryModeEdit(query)) {
		backLinkUrl = `${addAnotherDeadlineItem.route}`;
	} else if (submissionItemType === evidenceOrCommentValues[1]) {
		backLinkUrl = `${personalInformationComment.route}`;
	} else if (submissionItemType === evidenceOrCommentValues[2]) {
		backLinkUrl = getOptionTwoBackLinkUrl(
			getActiveSubmissionItemFiles(session),
			hasPersonalInformation
		);
	} else if (submissionItemType === evidenceOrCommentValues[3]) {
		backLinkUrl = getOptionThreeBackLinkUrl(hasPersonalInformation);
	}

	if (!backLinkUrl) throw new Error('Unable to assign back link URL');

	return {
		backLinkUrl
	};
};

module.exports = { getBackLinkUrl };
