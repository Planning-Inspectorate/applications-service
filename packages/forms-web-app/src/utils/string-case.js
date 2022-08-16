const lowerCase = (string) => {
	return string && typeof string === 'string' ? string.toLowerCase() : '';
};

const titleCase = (string) => {
	if (!string || typeof string !== 'string') return '';

	const stringToLowerCase = lowerCase(string);
	return upperCase(stringToLowerCase.charAt(0)) + stringToLowerCase.slice(1);
};

const upperCase = (string) => {
	return string && typeof string === 'string' ? string.toUpperCase() : '';
};

module.exports = {
	lowerCase,
	titleCase,
	upperCase
};
