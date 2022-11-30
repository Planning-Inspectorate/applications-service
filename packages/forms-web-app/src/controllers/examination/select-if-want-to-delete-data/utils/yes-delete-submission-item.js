const {
	findSubmissionItemToDelete,
	deleteSubmissionItem
} = require('../../session/submission-items-session');
const { iterateDeleteFileOnDisk } = require('../../file-upload/fileManagement');
const { getDeadlineItemToDelete } = require('../../session/deadlineItems-session');
const yesDeleteSubmissionItem = async (session) => {
	const deadlineItemToDelete = getDeadlineItemToDelete(session);
	const filesToDelete = findSubmissionItemToDelete(session, deadlineItemToDelete);
	if (filesToDelete.files) await iterateDeleteFileOnDisk(filesToDelete.files);
	deleteSubmissionItem(session, deadlineItemToDelete);
};

module.exports = {
	yesDeleteSubmissionItem
};
