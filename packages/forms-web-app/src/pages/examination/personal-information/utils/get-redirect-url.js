const {
	routesConfig: {
		examination: {
			pages: {
				checkSubmissionItem,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles
			}
		}
	}
} = require('../../../../routes/config');

const { getActiveSubmissionItemFiles } = require('../../_session/submission-items-session');
const getRedirectUrl = (session, setPageDataId, personalInformationValue) => {
	let redirectUrl = `${checkSubmissionItem.route}`;

	if (setPageDataId !== personalInformationComment.id && personalInformationValue === 'yes') {
		if (setPageDataId === personalInformationCommentFiles.id) {
			redirectUrl = `${personalInformationWhichCommentFiles.route}`;
		}

		if (setPageDataId === personalInformationFiles.id) {
			const submissionItemFiles = getActiveSubmissionItemFiles(session);

			if (submissionItemFiles.length > 1) {
				redirectUrl = `${personalInformationWhichFiles.route}`;
			}
		}
	}

	return redirectUrl;
};

module.exports = {
	getRedirectUrl
};
