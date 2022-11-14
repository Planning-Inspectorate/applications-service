const {
	getActiveSubmissionItem,
	getSubmissionItemType
} = require('../../session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment, personalInformationComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const getRedirectRoute = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const activeSubmissionItemType = getSubmissionItemType(activeSubmissionItem);

	let redirectUrl;

	switch (activeSubmissionItemType) {
		case evidenceOrComment.options[1].value:
			redirectUrl = personalInformationComment.route;
			break;
		case evidenceOrComment.options[3].value:
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
