const parseBoolean = (input) => {
	try {
		switch (typeof input) {
			case 'string':
				return JSON.parse(input.toLowerCase());
			case 'number':
				return input === 1 ? true : input === 0 ? false : null;
			case 'boolean':
				return input;
			default:
				return null;
		}
	} catch {
		return null;
	}
};

const parseInteger = (str) => {
	const i = parseInt(str);
	return isNaN(i) ? null : i;
};

module.exports = {
	parseBoolean,
	parseInteger
};
