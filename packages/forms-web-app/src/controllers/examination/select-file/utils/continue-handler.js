const { getUploadedFilesFromSession } = require('../../file-upload/fileSessionManagement');
const { getSubmissionItemPageUrl } = require('../../utils/get-submission-item-page-url');
const { noFileSelected } = require('./errors/fileValidation');
const { getRedirectRoute } = require('./get-redirect-route');
const { mapErrorMessage } = require('./helpers');
const { postRenderView } = require('./render-view');

const continueHandler = (req, res) => {
	const { session } = req;
	const uploadedFiles = getUploadedFilesFromSession(session);
	const noFileError = noFileSelected(uploadedFiles);
	if (noFileError) return postRenderView(req, res, session, mapErrorMessage(noFileError));
	const redirectUrl = getSubmissionItemPageUrl(req, getRedirectRoute(session));
	res.redirect(redirectUrl);
};

module.exports = { continueHandler };
