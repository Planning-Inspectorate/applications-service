const decodeString = (stringToDecode) => {
	if (!stringToDecode || typeof stringToDecode !== 'string') return '';

	const decodedString = decodeURIComponent(stringToDecode);

	return decodedString;
};

module.exports = { decodeString };
