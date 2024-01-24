const getFileNameFromDocumentUrl = (url = '') => {
	if (typeof url !== 'string') return null;

	const lastUrlSegment = url.split('/').filter(Boolean).pop() || '';
	const regex = /(?<=-)[^-]*(?=\.[^.]*$)/;
	const fileName = lastUrlSegment.match(regex);

	return fileName ? fileName[0].replaceAll('_', ' ') : null;
};

module.exports = { getFileNameFromDocumentUrl };
