const { fileUpload } = require('../../../../config');

const megabyte = 1024 * 1024;

const calcMaxFileSizeLimit = () => megabyte * fileUpload.maxFileSizeInMb;

const mapUploadedFilesToSummaryList = (uploadedFiles, i18n) => {
	const files = [];
	for (const file of uploadedFiles) {
		files.push({
			message: { html: file.fileName },
			deleteButton: { text: i18n.t('common.remove') },
			originalFileName: file.fileName,
			fileName: file.uniqueFileName
		});
	}
	return files;
};

const addHrefToErrorSummary = (errorSummary, href) =>
	errorSummary.length > 0
		? errorSummary.map((error) => ({
				...error,
				href
		  }))
		: errorSummary;

const makeIntoArray = (item) => (Array.isArray(item) ? item : [item]);

const mapErrorMessage = (errorMessage) => ({
	errorMessage: { text: errorMessage },
	errorSummary: [{ text: errorMessage }]
});

const mapMultipleFileUploadErrors = (errors) => {
	const errorSummary = [];
	let errorMessage = '';
	for (const error of errors) {
		errorMessage += error + '<br>';
		errorSummary.push({ text: error });
	}
	return {
		errorMessage: errorMessage ? { html: errorMessage } : false,
		errorSummary: errorSummary
	};
};

module.exports = {
	calcMaxFileSizeLimit,
	mapUploadedFilesToSummaryList,
	addHrefToErrorSummary,
	makeIntoArray,
	mapErrorMessage,
	mapMultipleFileUploadErrors
};
