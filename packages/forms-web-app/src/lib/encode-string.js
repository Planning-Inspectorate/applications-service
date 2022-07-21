const encodeString = (stringToEncode) => {
	if (!stringToEncode || typeof stringToEncode !== 'string') return '';

	const encodedString = encodeURIComponent(stringToEncode);

	return encodedString;
};

module.exports = { encodeString };
