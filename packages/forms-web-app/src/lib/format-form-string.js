const { decodeString } = require('./decode-string');

const formatFormString = (stringToSanitise) => {
	if (!stringToSanitise || typeof stringToSanitise !== 'string') return '';

	const decodedString = decodeString(stringToSanitise);

	const formattedString = decodedString
		.trim()
		.replace(/ {2,}/gm, ' ') //replace multiple spaces with a single one
		.replace(/(\r )/gm, '\r') //remove spaces after carriage return
		.replace(/(\n )/gm, '\n') //remove spaces after newline
		.replace(/^(\r\n|\n|\r){2,}/gm, '$1'); //remove multiple new lines, allowing maximum of one

	return formattedString;
};

module.exports = { formatFormString };
