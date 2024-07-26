const { getUploadedFilesFromSession } = require('../../_utils/file-upload/fileSessionManagement');
const { getPersonalInformationWhichOptions } = require('../config');

const mapRadioButton = (text, value, checked) => ({
	text,
	value,
	checked
});

const getFileOptions = (session) =>
	getUploadedFilesFromSession(session).map(({ fileName, uniqueFileName, personalInformation }) =>
		mapRadioButton(fileName, uniqueFileName, personalInformation === 'yes')
	);

const getCommentOption = (i18n, { commentPersonalInformation }) => {
	const {
		1: { text, value }
	} = getPersonalInformationWhichOptions(i18n);

	return mapRadioButton(text, value, commentPersonalInformation === 'yes');
};

module.exports = {
	getFileOptions,
	getCommentOption
};
