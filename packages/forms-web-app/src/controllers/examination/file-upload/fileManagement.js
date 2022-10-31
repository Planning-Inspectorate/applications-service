const path = require('path');
const fs = require('fs');

const fileUploadPath = (fileName) =>
	path.join(__dirname + '/../../../../../../uploads/' + fileName);

const saveFileToDisk = async (file) => {
	const uniqueFileName = Date.now() + `-${file.name}`;
	const uploadPath = fileUploadPath(uniqueFileName);

	await file.mv(uploadPath);

	return {
		fileName: file.name,
		uniqueFileName,
		uploadPath
	};
};

const deleteFileOnDisk = async (file) => {
	const fileToDeletePath = fileUploadPath(file);
	await fs.unlinkSync(fileToDeletePath);
};

module.exports = {
	fileUploadPath,
	saveFileToDisk,
	deleteFileOnDisk
};
