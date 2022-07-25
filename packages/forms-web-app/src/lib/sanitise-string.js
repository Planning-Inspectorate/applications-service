const { decodeString } = require('./decode-string');

const sanitiseString = (stringToSanitise) => {
	if (!stringToSanitise || typeof stringToSanitise !== 'string') return '';

	const decodedString = decodeString(stringToSanitise);

	const sanitisedString = decodedString
		.replace(/<[^>]*>/gm, '')
		.replace(/ {2,}/gm, ' ')
		.trim()
		.replace(/(\r )/gm, '\r')
		.replace(/(\n )/gm, '\n')
		.replace(/^(\r\n|\n|\r){2,}/gm, '$1');

	return sanitisedString;
};

module.exports = { sanitiseString };
