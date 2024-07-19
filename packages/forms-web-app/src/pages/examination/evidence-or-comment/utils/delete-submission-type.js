const {
	deleteKeyFromActiveSubmissionItem,
	getActiveSubmissionItem
} = require('../../_session/submission-items-session');
const { evidenceOrCommentValues } = require('../config');
const {
	routesConfig: {
		examination: {
			pages: { enterComment, selectFile }
		}
	}
} = require('../../../../routes/config');
const { iterateDeleteFileOnDisk } = require('../../_utils/file-upload/fileManagement');

const deleteSubmissionType = async (session, value) => {
	if (value === evidenceOrCommentValues[1]) {
		const filesToDelete = getActiveSubmissionItem(session);
		if (filesToDelete.files) await iterateDeleteFileOnDisk(filesToDelete.files);
		deleteKeyFromActiveSubmissionItem(session, selectFile.sessionId);
	} else if (value === evidenceOrCommentValues[2]) {
		deleteKeyFromActiveSubmissionItem(session, enterComment.sessionId);
	}
};

module.exports = { deleteSubmissionType };
