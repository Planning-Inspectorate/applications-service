const { noFileSelected, moreThanXAmountFiles } = require('./errors/fileValidation');
const { makeIntoArray, mapErrorMessage, mapMultipleFileUploadErrors } = require('./helpers');
const {
	handleMultipleFileUploadsWithErrors
} = require('./errors/handleMultipleFileUploadsWithErrors');
const { getSubmissionFilesLength } = require('../../session/submission-items-session');

const uploadHandler = async (session, files) => {
	const noFileError = noFileSelected(files);
	if (noFileError) return mapErrorMessage(noFileError);

	const filesToUpload = makeIntoArray(files.documents);

	const moreThanError = moreThanXAmountFiles(filesToUpload, getSubmissionFilesLength(session));

	if (moreThanError) return mapErrorMessage(moreThanError);

	const multipleErrors = await handleMultipleFileUploadsWithErrors(session, filesToUpload);
	if (multipleErrors.length > 0) return mapMultipleFileUploadErrors(multipleErrors);

	return {
		errorMessage: false,
		errorSummary: []
	};
};

module.exports = {
	uploadHandler
};
