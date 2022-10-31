const { getUploadedFilesFromSession } = require('../../file-upload/fileSessionManagement');
const { noFileSelected } = require('./errors/fileValidation');
const { mapErrorMessage } = require('./helpers');
const { postRenderView } = require('./render-view');

const continueHandler = (req, res) => {
	const { session } = req;
	const uploadedFiles = getUploadedFilesFromSession(req.session);
	const noFileError = noFileSelected(uploadedFiles);
	if (noFileError) return postRenderView(req, res, session, mapErrorMessage(noFileError));

	res.redirect('/examination/files-have-personal-information-or-not');
};

module.exports = { continueHandler };
