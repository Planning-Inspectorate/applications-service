const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const {
	getSubmissionItemTitleByLocale
} = require('../../_utils/get-content/get-submission-item-title-by-locale');
const { getFileOptions, getCommentOption } = require('./getOptions');
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

const pageData = (i18n) => ({
	backLinkUrl: `${personalInformationFiles.route}`,
	id: personalInformationWhichFiles.id,
	pageTitle: i18n.t('examination.personalInformationWhich.files.title'),
	title: i18n.t('examination.personalInformationWhich.files.heading1'),
	route: `${personalInformationWhichFiles.route}`
});

const bothCommentAndFilesPageData = (i18n) => ({
	id: personalInformationWhichCommentFiles.id,
	pageTitle: i18n.t('examination.personalInformationWhich.commentFiles.title'),
	title: i18n.t('examination.personalInformationWhich.commentFiles.heading1'),
	backLinkUrl: `${personalInformationCommentFiles.route}`,
	route: `${personalInformationWhichCommentFiles.route}`
});

const getPageData = (i18n, session) => {
	let setPageData = { ...pageData(i18n) };

	const activeSubmissionItem = getActiveSubmissionItem(session);

	const options = getFileOptions(session);

	if (activeSubmissionItem.submissionType === 'both') {
		setPageData = { ...bothCommentAndFilesPageData(i18n) };
		options.unshift(getCommentOption(i18n, activeSubmissionItem));
	}

	return {
		...setPageData,
		submissionItemTitle: getSubmissionItemTitleByLocale(i18n, session),
		radioOptions: options
	};
};

module.exports = {
	getPageData
};
