const normaliseRequestFileData = (req, res, next) => {
	if (req.files && req.files.file) {
		const incomingFile = req.files.file;

		req.file = {
			originalName: incomingFile.name,
			buffer: incomingFile.data,
			size: incomingFile.size,
			mimeType: incomingFile.mimetype,
			md5: incomingFile.md5
		};
	}

	next();
};

module.exports = {
	normaliseRequestFileData
};
