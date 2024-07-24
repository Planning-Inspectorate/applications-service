const { getUploadedFilesFromSession } = require('../../_utils/file-upload/fileSessionManagement');
const { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
const { noFileSelected } = require('./errors/fileValidation');
const { getRedirectRoute } = require('./get-redirect-route');
const { mapErrorMessage } = require('./helpers');
const { postRenderView } = require('./render-view');

const continueHandler = (req, res) => {
	const { i18n, session } = req;
	const uploadedFiles = getUploadedFilesFromSession(session);
	const noFileError = noFileSelected(i18n, uploadedFiles);
	if (noFileError) return postRenderView(req, res, session, mapErrorMessage(noFileError));
	const redirectUrl = getSubmissionItemPageUrl(req, getRedirectRoute(session));
	res.redirect(redirectUrl);
};

module.exports = { continueHandler };
