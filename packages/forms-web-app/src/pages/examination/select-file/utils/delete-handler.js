const { deleteFileOnDisk } = require('../../_utils/file-upload/fileManagement');
const { deleteFileInSession } = require('../../_utils/file-upload/fileSessionManagement');
const deleteHandler = async (session, name) => {
	await deleteFileOnDisk(name);
	deleteFileInSession(session, name);
};

module.exports = {
	deleteHandler
};
