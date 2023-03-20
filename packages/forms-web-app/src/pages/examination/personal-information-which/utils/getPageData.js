const {
	routesConfig: {
		examination: {
			pages: {
				personalInformationCommentFiles,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles,
				personalInformationFiles
			}
		}
	}
} = require('../../../../routes/config');
const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getFileOptions, getCommentOption } = require('./getOptions');

const pageData = {
	backLinkUrl: `${personalInformationFiles.route}`,
	id: personalInformationWhichFiles.id,
	pageTitle: personalInformationWhichFiles.name,
	title: personalInformationWhichFiles.name,
	route: `${personalInformationWhichFiles.route}`
};

const bothCommentAndFilesPageData = {
	id: personalInformationWhichCommentFiles.id,
	pageTitle: personalInformationWhichCommentFiles.name,
	title: personalInformationWhichCommentFiles.name,
	backLinkUrl: `${personalInformationCommentFiles.route}`,
	route: `${personalInformationWhichCommentFiles.route}`
};

const getPageData = (session) => {
	let setPageData = { ...pageData };

	const activeSubmissionItem = getActiveSubmissionItem(session);

	const options = getFileOptions(session);

	if (activeSubmissionItem.submissionType === 'both') {
		setPageData = { ...bothCommentAndFilesPageData };
		options.unshift(getCommentOption(activeSubmissionItem));
	}

	return {
		...setPageData,
		activeSubmissionItemTitle: activeSubmissionItem.submissionItem,
		radioOptions: options
	};
};

module.exports = {
	getPageData
};
