const { addHrefToErrorSummary, mapUploadedFilesToSummaryList } = require('./helpers');
const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getUploadedFilesFromSession } = require('../../_utils/file-upload/fileSessionManagement');

const view = 'examination/select-file/view.njk';

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { evidenceOrComment, selectFile, enterComment }
		}
	}
} = require('../../../../routes/config');

const {
	fileUpload: { maxFileSizeInMb }
} = require('../../../../config');

const pageData = {
	id: selectFile.id,
	pageTitle: selectFile.name,
	title: selectFile.name,
	maxFileSizeInMb
};

const getBackLinkUrl = (submissionType) => {
	let backLinkUrl = `${examinationDirectory}${evidenceOrComment.route}`;

	if (submissionType === 'both') backLinkUrl = `${examinationDirectory}${enterComment.route}`;

	return backLinkUrl;
};

const getRenderView = (req, res) => {
	const { session } = req;
	const { submissionItem, submissionType } = getActiveSubmissionItem(session);
	res.render(view, {
		...pageData,
		backLinkUrl: getBackLinkUrl(submissionType),
		activeSubmissionItemTitle: submissionItem,
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session))
	});
};

const postRenderView = (req, res, session, { errorMessage, errorSummary }) => {
	const isJsEnabled = req.body.isJsEnabled || false;
	const href = isJsEnabled ? '#file-upload' : `#${selectFile.id}`;
	const { submissionItem, submissionType } = getActiveSubmissionItem(session);
	return res.render(view, {
		...pageData,
		backLinkUrl: getBackLinkUrl(submissionType),
		isJsEnabled,
		activeSubmissionItemTitle: submissionItem,
		errorMessage,
		errorSummary: addHrefToErrorSummary(errorSummary, href),
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session))
	});
};

module.exports = { getRenderView, postRenderView };
