const encodeString = (stringToEncode) => {
	if (!stringToEncode || typeof stringToEncode !== 'string') return '';

	let encodedString = '';

	try {
		encodedString = encodeURIComponent(stringToEncode);
	} catch {
		encodedString = stringToEncode;
	}

	return encodedString;
};

module.exports = { encodeString };
