const { parseBoolean, parseInteger } = require('../utils/parse');

const parseFormDataProperties = (booleanProperties, integerProperties) => {
	return (req, res, next) => {
		if (req.body) {
			const parseProperty = (property, parseFunction) => {
				if (req.body[property]) req.body[property] = parseFunction(req.body[property]);
			};

			booleanProperties.forEach((property) => parseProperty(property, parseBoolean));
			integerProperties.forEach((property) => parseProperty(property, parseInteger));
		}

		next();
	};
};

const parseIntegerParam = (property) => {
	return (req, res, next) => {
		if (req.params && req.params[property]) {
			req.params[property] = parseInteger(req.params[property]);
		}

		next();
	};
}

module.exports = {
	parseFormDataProperties,
	parseIntegerParam
};
