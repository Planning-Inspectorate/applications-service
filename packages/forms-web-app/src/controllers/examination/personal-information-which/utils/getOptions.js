const { getUploadedFilesFromSession } = require('../../file-upload/fileSessionManagement');

const mapRadioButton = (text, value, checked) => ({
	text,
	value,
	checked
});

const getFileOptions = (session) =>
	getUploadedFilesFromSession(session).map(({ fileName, uniqueFileName, personalInformation }) =>
		mapRadioButton(fileName, uniqueFileName, personalInformation === 'yes')
	);

const getCommentOption = ({ commentPersonalInformation }) =>
	mapRadioButton('My comment', 'comment', commentPersonalInformation === 'yes');

module.exports = {
	getFileOptions,
	getCommentOption
};
