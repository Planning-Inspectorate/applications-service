const { multipleFileValidations } = require('./fileValidation');
const { saveFileToDisk } = require('../../../_utils/file-upload/fileManagement');
const { addFileToSession } = require('../../../_utils/file-upload/fileSessionManagement');

const handleMultipleFileUploadsWithErrors = async (i18n, session, fileToUpload) => {
	const errors = [];
	for (const document of fileToUpload) {
		const error = multipleFileValidations(i18n, document);
		if (!error) {
			const savedFileData = await saveFileToDisk(document);
			addFileToSession(session, {
				...savedFileData,
				raw: document
			});
		} else {
			errors.push(error);
		}
	}
	return errors;
};

module.exports = {
	handleMultipleFileUploadsWithErrors
};
