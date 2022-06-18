const mimeTypeMappings = {
	'application/pdf': 'PDF',
	'text/html': 'HTML',
	'video/mp4': 'Video',
	'video/quicktime': 'Video',
	'video/mpeg': 'Audio',
	'video/x-wav': 'Audio',
	'application/msword': 'Word',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
	'application/x-zip-compressed': 'Zip'
};

module.exports = (mimeType) => {
	return mimeTypeMappings[mimeType] || mimeType;
};
