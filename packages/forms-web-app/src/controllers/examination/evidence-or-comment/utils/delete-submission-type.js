const {
	deleteKeyFromActiveSubmissionItem,
	getActiveSubmissionItem
} = require('../../session/submission-items-session');
const {
	routesConfig: {
		examination: {
			pages: { enterComment, evidenceOrComment, selectFile }
		}
	}
} = require('../../../../routes/config');
const { iterateDeleteFileOnDisk } = require('../../file-upload/fileManagement');

const deleteSubmissionType = async (session, value) => {
	if (value === evidenceOrComment.options[1].value) {
		const filesToDelete = getActiveSubmissionItem(session);
		if (filesToDelete.files) await iterateDeleteFileOnDisk(filesToDelete.files);
		deleteKeyFromActiveSubmissionItem(session, selectFile.sessionId);
	} else if (value === evidenceOrComment.options[2].value) {
		deleteKeyFromActiveSubmissionItem(session, enterComment.sessionId);
	}
};

module.exports = { deleteSubmissionType };
