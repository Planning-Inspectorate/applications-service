const formatValueToValidElementId = (value) =>
	value
		.replace(/[^a-zA-Z0-9\- ]/g, '')
		.replace(/\s/g, '-')
		.toLowerCase();

module.exports = { formatValueToValidElementId };
