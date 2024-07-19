const {
	getActiveSubmissionItem,
	getSubmissionItemType
} = require('../../_session/submission-items-session');

const { evidenceOrCommentValues } = require('../../evidence-or-comment/config');

const {
	routesConfig: {
		examination: {
			pages: { personalInformationComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const getRedirectRoute = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const activeSubmissionItemType = getSubmissionItemType(activeSubmissionItem);

	let redirectUrl;

	switch (activeSubmissionItemType) {
		case evidenceOrCommentValues[1]:
			redirectUrl = personalInformationComment.route;
			break;
		case evidenceOrCommentValues[3]:
			redirectUrl = selectFile.route;
			break;
		default:
			throw new Error('Value does not match a required submission type option');
	}

	return redirectUrl;
};

module.exports = {
	getRedirectRoute
};
