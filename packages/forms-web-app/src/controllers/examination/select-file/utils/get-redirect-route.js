const {
	getSubmissionItemType,
	getActiveSubmissionItem
} = require('../../session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment, personalInformationCommentFiles, personalInformationFiles }
		}
	}
} = require('../../../../routes/config');

const getRedirectRoute = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const activeSubmissionItemType = getSubmissionItemType(activeSubmissionItem);

	let redirectUrl;

	if (activeSubmissionItemType === evidenceOrComment.options[2].value)
		redirectUrl = personalInformationFiles.route;
	else if (activeSubmissionItemType === evidenceOrComment.options[3].value)
		redirectUrl = personalInformationCommentFiles.route;

	if (!redirectUrl) throw new Error('Value does not match a required submission type');

	return redirectUrl;
};

module.exports = { getRedirectRoute };
