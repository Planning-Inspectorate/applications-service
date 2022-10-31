const { calcMaxFileSizeLimit } = require('../helpers');

const allowedMimeTypes = [
	'application/pdf',
	'application/msword',
	'application/vnd.ms-excel',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'image/jpeg',
	'image/jpeg',
	'image/png',
	'image/tiff',
	'image/tiff',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const {
	routesConfig: {
		examination: {
			pages: { selectFile }
		}
	}
} = require('../../../../../routes/config');

const {
	fileUpload: { amountOfFileslimit, maxFileSizeInMb }
} = require('../../../../../config');

const {
	maxSize: maxSizeMessage,
	checkMimeType: checkMimeTypeMessage,
	isEmpty: isEmptyMessage
} = selectFile.onError.message;

const { noFileSelected: noFileSelectedMessage, moreThanXFiles: moreThanXAmountFilesMessage } =
	selectFile.onError.message;

const moreThanXAmountFiles = (fileToUpload, uploadedFilesLength) => {
	const totalItems = uploadedFilesLength + fileToUpload.length;
	if (totalItems > amountOfFileslimit || fileToUpload.length > amountOfFileslimit) {
		return moreThanXAmountFilesMessage(amountOfFileslimit);
	}
};

const noFileSelected = (files) => {
	if (!files || files.length === 0) return noFileSelectedMessage;
};

const multipleFileValidations = (fileToUpload) => {
	const { mimetype, size, name } = fileToUpload;
	if (size === 0) return isEmptyMessage(name);
	if (size > calcMaxFileSizeLimit()) return maxSizeMessage(name, maxFileSizeInMb);
	if (!allowedMimeTypes.includes(mimetype)) return checkMimeTypeMessage(name);
};

module.exports = {
	noFileSelected,
	moreThanXAmountFiles,
	multipleFileValidations
};
