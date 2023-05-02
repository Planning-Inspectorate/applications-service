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

const parseCSV = (str) => {
	if (!str) return [];

	try {
		return str.split(',').map((s) => s.trim());
	} catch (e) {
		console.error(e);
		return [];
	}
};

module.exports = {
	parseBoolean,
	parseInteger,
	parseCSV
};
