const { parseInteger } = require('../utils/parse');

/**
 * coerce non-array query param value into array
 * @param {string[]} paramNames
 * @returns {(function(*, *, *): void)|*}
 */
const normaliseArrayQueryParams = (paramNames) => (req, res, next) => {
	paramNames.forEach((paramName) => {
		const paramValue = req.query?.[paramName];
		// convert non-array to array
		if (paramValue) req.query[paramName] = Array.isArray(paramValue) ? paramValue : [paramValue];
		// convert empty string to empty array
		if (paramValue === '') req.query[paramName] = [];
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

const parseIntegerPathParams = (paramNames) => (req, res, next) => {
	paramNames.forEach((paramName) => {
		const paramValue = req.params?.[paramName];
		if (paramValue) req.params[paramName] = parseInteger(paramValue);
	});
	next();
};

const parseBooleanQueryParams = (paramNames) => (req, res, next) => {
	paramNames.forEach((paramName) => {
		const paramValue = req.query?.[paramName];
		if (paramValue === 'true') req.query[paramName] = true;
		else req.query[paramName] = false;
	});
	next();
};

module.exports = {
	normaliseArrayQueryParams,
	parseIntegerQueryParams,
	parseIntegerPathParams,
	parseBooleanQueryParams
};
