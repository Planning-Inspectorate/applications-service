const {
	getSubmissionItemType,
	getSubmissionItemPersonalInformation,
	getActiveSubmissionItemFiles,
	getActiveSubmissionItem
} = require('../../_session/submission-items-session');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');
const {
	routesConfig: {
		examination: {
			pages: {
				addAnotherDeadlineItem,
				evidenceOrComment,
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
	} else if (submissionItemType === evidenceOrComment.options[1].value) {
		backLinkUrl = `${personalInformationComment.route}`;
	} else if (submissionItemType === evidenceOrComment.options[2].value) {
		backLinkUrl = getOptionTwoBackLinkUrl(
			getActiveSubmissionItemFiles(session),
			hasPersonalInformation
		);
	} else if (submissionItemType === evidenceOrComment.options[3].value) {
		backLinkUrl = getOptionThreeBackLinkUrl(hasPersonalInformation);
	}

	if (!backLinkUrl) throw new Error('Unable to assign back link URL');

	return {
		backLinkUrl
	};
};

module.exports = { getBackLinkUrl };
