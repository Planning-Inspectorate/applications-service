const { encodeString } = require('./encode-string');
const { sanitiseString } = require('./sanitise-string');

const sanitiseEncodeString = (string) => {
	if (!string || typeof string !== 'string') return '';

	const sanitisedString = sanitiseString(string);
	const encodedString = encodeString(sanitisedString);

	return encodedString;
};

module.exports = { sanitiseEncodeString };
