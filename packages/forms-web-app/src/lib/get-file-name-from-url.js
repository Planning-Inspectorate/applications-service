const getFileNameFromDocumentUrl = (url = '') => {
	if (typeof url !== 'string') return null;

	const lastUrlSegment = url.split('/').filter(Boolean).pop();

	if (!lastUrlSegment) return null;

	const regexWithExtension = /(?<=-)[^-]*(?=\.[^.]*$)/;
	const regexWithoutExtension = /(?<=-)[^-]*$/;

	let match =
		lastUrlSegment.match(regexWithExtension) || lastUrlSegment.match(regexWithoutExtension);

	if (!match) return null;

	return match[0].replaceAll('_', ' ');
};

module.exports = { getFileNameFromDocumentUrl };
