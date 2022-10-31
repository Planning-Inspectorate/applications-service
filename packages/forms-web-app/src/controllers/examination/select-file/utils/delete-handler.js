const { deleteFileOnDisk } = require('../../file-upload/fileManagement');
const { deleteFileInSession } = require('../../file-upload/fileSessionManagement');
const deleteHandler = async (session, name) => {
	await deleteFileOnDisk(name);
	deleteFileInSession(session, name);
};

module.exports = {
	deleteHandler
};
