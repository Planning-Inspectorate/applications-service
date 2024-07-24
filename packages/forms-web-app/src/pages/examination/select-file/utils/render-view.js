const { addHrefToErrorSummary, mapUploadedFilesToSummaryList } = require('./helpers');
const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getUploadedFilesFromSession } = require('../../_utils/file-upload/fileSessionManagement');

const view = 'examination/select-file/view.njk';

const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment, selectFile, enterComment }
		}
	}
} = require('../../../../routes/config');

const {
	fileUpload: { maxFileSizeInMb }
} = require('../../../../config');
const {
	getSubmissionItemTitleByLocale
} = require('../../_utils/get-content/get-submission-item-title-by-locale');

const pageData = {
	id: selectFile.id,
	maxFileSizeInMb
};

const getBackLinkUrl = (submissionType) => {
	let backLinkUrl = `${evidenceOrComment.route}`;

	if (submissionType === 'both') backLinkUrl = `${enterComment.route}`;

	return backLinkUrl;
};

const getRenderView = (req, res) => {
	const { i18n, session } = req;
	const { submissionType } = getActiveSubmissionItem(session);

	return res.render(view, {
		...pageData,
		backLinkUrl: getBackLinkUrl(submissionType),
		submissionItemTitle: getSubmissionItemTitleByLocale(i18n, session),
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session), i18n)
	});
};

const postRenderView = (req, res, session, { errorMessage, errorSummary }) => {
	const { i18n } = req;
	const isJsEnabled = req.body.isJsEnabled || false;
	const href = isJsEnabled ? '#file-upload' : `#${selectFile.id}`;
	const { submissionType } = getActiveSubmissionItem(session);

	return res.render(view, {
		...pageData,
		backLinkUrl: getBackLinkUrl(submissionType),
		isJsEnabled,
		submissionItemTitle: getSubmissionItemTitleByLocale(i18n, session),
		errorMessage,
		errorSummary: addHrefToErrorSummary(errorSummary, href),
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session), i18n)
	});
};

module.exports = { getRenderView, postRenderView };
