const isStringPartOfArray = (haystack, needle) => {
	if (!Array.isArray(haystack) || typeof needle !== 'string')
		throw new Error('Function accepts an array and a string as arguments');

	const lowerCasedHaystack = haystack.map((item) => item.toLowerCase());
	const lowerCasedNeedle = needle.toLowerCase();

	return lowerCasedHaystack.includes(lowerCasedNeedle);
};

module.exports = { isStringPartOfArray };
