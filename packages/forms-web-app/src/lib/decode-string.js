const decodeString = (stringToDecode) => {
	if (!stringToDecode || typeof stringToDecode !== 'string') return '';

	let decodedString = '';

	try {
		decodedString = decodeURIComponent(stringToDecode);
	} catch {
		decodedString = stringToDecode;
	}

	return decodedString;
};

module.exports = { decodeString };
