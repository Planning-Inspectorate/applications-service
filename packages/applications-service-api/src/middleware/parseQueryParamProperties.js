const { parseInteger } = require('../utils/parse');

/**
 * coerce non-array query param value into array
 * @param {string[]} paramNames
 * @returns {(function(*, *, *): void)|*}
 */
const normaliseArrayQueryParams = (paramNames) => (req, res, next) => {
	paramNames.forEach((paramName) => {
		const paramValue = req.query?.[paramName];
		if (paramValue) req.query[paramName] = Array.isArray(paramValue) ? paramValue : [paramValue];
	});
	next();
};

const parseIntegerQueryParams = (paramNames) => (req, res, next) => {
	paramNames.forEach((paramName) => {
		const paramValue = req.query?.[paramName];
		if (paramValue) req.query[paramName] = parseInteger(paramValue);
	});
	next();
};

module.exports = { normaliseArrayQueryParams, parseIntegerQueryParams };
