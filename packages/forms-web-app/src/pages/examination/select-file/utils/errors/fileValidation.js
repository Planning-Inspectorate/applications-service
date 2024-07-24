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
	fileUpload: { amountOfFileslimit, maxFileSizeInMb }
} = require('../../../../../config');

const noFileSelectedMessage = (i18n) => i18n.t('examination.selectFile.errorMessage1');
const isEmptyMessage = (i18n, fileToUploadName = '') =>
	i18n.t('examination.selectFile.errorMessage2', { fileToUploadName });
const checkMimeTypeMessage = (i18n, fileToUploadName = '') =>
	i18n.t('examination.selectFile.errorMessage3', { fileToUploadName });
const maxSizeMessage = (i18n, fileToUploadName = '', size) =>
	i18n.t('examination.selectFile.errorMessage4', { fileToUploadName, size });
const moreThanXAmountFilesMessage = (i18n, limit) =>
	i18n.t('examination.selectFile.errorMessage5', { limit });

const moreThanXAmountFiles = (i18n, fileToUpload, uploadedFilesLength) => {
	const totalItems = uploadedFilesLength + fileToUpload.length;
	if (totalItems > amountOfFileslimit || fileToUpload.length > amountOfFileslimit) {
		return moreThanXAmountFilesMessage(i18n, amountOfFileslimit);
	}
};

const noFileSelected = (i18n, files) => {
	if (!files || files.length === 0) return noFileSelectedMessage(i18n);
};

const multipleFileValidations = (i18n, fileToUpload) => {
	const { mimetype, size, name } = fileToUpload;
	if (size === 0) return isEmptyMessage(i18n, name);
	if (size > calcMaxFileSizeLimit()) return maxSizeMessage(i18n, name, maxFileSizeInMb);
	if (!allowedMimeTypes.includes(mimetype)) return checkMimeTypeMessage(i18n, name);
};

module.exports = {
	noFileSelected,
	moreThanXAmountFiles,
	multipleFileValidations
};
