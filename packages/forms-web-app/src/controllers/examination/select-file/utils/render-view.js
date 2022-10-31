const { addHrefToErrorSummary, mapUploadedFilesToSummaryList } = require('./helpers');
const { getActiveSubmissionItem } = require('../../session/submission-items-session');
const { getUploadedFilesFromSession } = require('../../file-upload/fileSessionManagement');
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { evidenceOrComment, selectFile }
		}
	}
} = require('../../../../routes/config');

const {
	fileUpload: { maxFileSizeInMb }
} = require('../../../../config');

const pageData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrComment.route}`,
	id: selectFile.id,
	pageTitle: selectFile.name,
	title: selectFile.name,
	maxFileSizeInMb
};

const getRenderView = (req, res) => {
	const { session } = req;
	const { submissionItem } = getActiveSubmissionItem(session);
	res.render(selectFile.view, {
		...pageData,
		activeSubmissionItemTitle: submissionItem,
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session))
	});
};

const postRenderView = (req, res, session, { errorMessage, errorSummary }) => {
	const isJsEnabled = req.body.isJsEnabled || false;
	const href = isJsEnabled ? '#file-upload' : `#${selectFile.id}`;
	const { submissionItem } = getActiveSubmissionItem(session);
	return res.render(selectFile.view, {
		...pageData,
		isJsEnabled,
		activeSubmissionItemTitle: submissionItem,
		errorMessage,
		errorSummary: addHrefToErrorSummary(errorSummary, href),
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session))
	});
};

module.exports = { getRenderView, postRenderView };
