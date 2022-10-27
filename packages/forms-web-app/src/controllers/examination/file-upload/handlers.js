const { deleteFileOnDisk } = require('./fileManagement');
const { deleteFileInSession } = require('./fileSessionManagement');
const { noFileSelected, moreThanXAmountFiles } = require('./fileValidation');
const { makeIntoArray, mapErrorMessage, mapMultipleFileUploadErrors } = require('./utils');
const { handleMultipleFileUploadsWithErrors } = require('./handleMultipleFileUploadsWithErrors');
const { getSelectedDeadlineFilesLength } = require('../utils/sessionHelpers');

const deleteHandler = async (session, name) => {
	await deleteFileOnDisk(name);
	deleteFileInSession(session, name);
};

const uploadHandler = async (session, files) => {
	const noFileError = noFileSelected(files);
	if (noFileError) return mapErrorMessage(noFileError);

	const filesToUpload = makeIntoArray(files.documents);
	const moreThanError = moreThanXAmountFiles(
		filesToUpload,
		getSelectedDeadlineFilesLength(session)
	);
	if (moreThanError) return mapErrorMessage(moreThanError);

	const multipleErrors = await handleMultipleFileUploadsWithErrors(session, filesToUpload);
	if (multipleErrors.length > 0) return mapMultipleFileUploadErrors(multipleErrors);

	return {
		errorMessage: false,
		errorSummary: []
	};
};

module.exports = {
	deleteHandler,
	uploadHandler
};
