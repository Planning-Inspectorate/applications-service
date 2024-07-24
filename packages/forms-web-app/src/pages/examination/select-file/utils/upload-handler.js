const { noFileSelected, moreThanXAmountFiles } = require('./errors/fileValidation');
const { makeIntoArray, mapErrorMessage, mapMultipleFileUploadErrors } = require('./helpers');
const {
	handleMultipleFileUploadsWithErrors
} = require('./errors/handleMultipleFileUploadsWithErrors');
const { getSubmissionFilesLength } = require('../../_session/submission-items-session');

const uploadHandler = async (i18n, session, files) => {
	const noFileError = noFileSelected(i18n, files);

	if (noFileError) return mapErrorMessage(noFileError);

	const filesToUpload = makeIntoArray(files.documents);

	const moreThanError = moreThanXAmountFiles(
		i18n,
		filesToUpload,
		getSubmissionFilesLength(session)
	);

	if (moreThanError) return mapErrorMessage(moreThanError);

	const multipleErrors = await handleMultipleFileUploadsWithErrors(i18n, session, filesToUpload);

	if (multipleErrors.length > 0) return mapMultipleFileUploadErrors(multipleErrors);

	return {
		errorMessage: false,
		errorSummary: []
	};
};

module.exports = {
	uploadHandler
};
