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

module.exports = {
	parseFormDataProperties
};
