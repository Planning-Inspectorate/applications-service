const { multipleFileValidations } = require('./fileValidation');
const { saveFileToDisk } = require('./fileManagement');
const { addFileToSession } = require('./fileSessionManagement');

const handleMultipleFileUploadsWithErrors = async (session, fileToUpload) => {
	const errors = [];
	for (const document of fileToUpload) {
		const error = multipleFileValidations(document);
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
