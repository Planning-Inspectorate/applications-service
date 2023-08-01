const checkHowOftenValueType = (howOftenValue) =>
	typeof howOftenValue === 'string' || Array.isArray(howOftenValue);

const formatHowOftenValue = (howOftenValue) => {
	if (!checkHowOftenValueType(howOftenValue))
		throw new Error('Get updates how often value is required to be a string or array');

	return Array.isArray(howOftenValue) ? howOftenValue : [howOftenValue];
};

module.exports = { formatHowOftenValue };
