const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				personalInformationCommentFiles,
				personalInformationWhichCommentFiles,
				personalInformationWhichFiles,
				personalInformationFiles
			}
		}
	}
} = require('../../../../routes/config');
const { getActiveSubmissionItem } = require('../../session/submission-items-session');
const { getFileOptions, getCommentOption } = require('./getOptions');

const pageData = {
	backLinkUrl: `${examinationDirectory}${personalInformationFiles.route}`,
	id: personalInformationWhichFiles.id,
	pageTitle: personalInformationWhichFiles.name,
	title: personalInformationWhichFiles.name,
	route: `${examinationDirectory}${personalInformationWhichFiles.route}`
};

const bothCommentAndFilesPageData = {
	id: personalInformationWhichCommentFiles.id,
	pageTitle: personalInformationWhichCommentFiles.name,
	title: personalInformationWhichCommentFiles.name,
	backLinkUrl: `${examinationDirectory}${personalInformationCommentFiles.route}`,
	route: `${examinationDirectory}${personalInformationWhichCommentFiles.route}`
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
