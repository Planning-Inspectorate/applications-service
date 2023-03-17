const {
	findSubmissionItemToDelete,
	deleteSubmissionItem
} = require('../../_session/submission-items-session');
const { iterateDeleteFileOnDisk } = require('../../_utils/file-upload/fileManagement');
const { getDeadlineItemToDelete } = require('../../_session/deadlineItems-session');
const yesDeleteSubmissionItem = async (session) => {
	const deadlineItemToDelete = getDeadlineItemToDelete(session);
	const filesToDelete = findSubmissionItemToDelete(session, deadlineItemToDelete);
	if (filesToDelete.files) await iterateDeleteFileOnDisk(filesToDelete.files);
	deleteSubmissionItem(session, deadlineItemToDelete);
};

module.exports = {
	yesDeleteSubmissionItem
};
