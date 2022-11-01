const { makeIntoArray } = require('../../select-file/utils/helpers');
const { addKeyValueToActiveSubmissionItem } = require('../../session/submission-items-session');
const { getUploadedFilesFromSession } = require('../../file-upload/fileSessionManagement');

const markCommentAsPersonalIfPresent = (session, arrayOfPersonalMarks) => {
	if (arrayOfPersonalMarks.find((item) => item === 'comment'))
		addKeyValueToActiveSubmissionItem(session, 'commentPersonalInformation', 'yes');
};

const markFilesAsPersonalIfPresent = (session, arrayOfPersonalMarks) => {
	const uploadedFilesFromSession = getUploadedFilesFromSession(session);
	arrayOfPersonalMarks
		.filter((items) => items !== 'comment')
		.forEach((item) => {
			const file = uploadedFilesFromSession.find((file) => file.uniqueFileName === item);
			if (file && file.uniqueFileName === item) file.personalInformation = 'yes';
		});
};

const clearAllPersonalInformationFlags = (session) => {
	addKeyValueToActiveSubmissionItem(session, 'commentPersonalInformation', 'no');
	getUploadedFilesFromSession(session).map((file) => (file.personalInformation = 'no'));
};

const savePersonalInformationFlags = (session, toMarkAsPersonal) => {
	const arrayOfPersonalMarks = makeIntoArray(toMarkAsPersonal);
	clearAllPersonalInformationFlags(session);
	markCommentAsPersonalIfPresent(session, arrayOfPersonalMarks);
	markFilesAsPersonalIfPresent(session, arrayOfPersonalMarks);
};

module.exports = {
	savePersonalInformationFlags,
	clearAllPersonalInformationFlags
};
