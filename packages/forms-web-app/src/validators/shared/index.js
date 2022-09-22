const { validateNotEmpty } = require('./not-empty');
const { validateNotEmptyAndLength } = require('./not-empty-and-length');
const { addressValidationRules } = require('./address');

module.exports = {
	validateNotEmpty,
	validateNotEmptyAndLength,
	addressValidationRules
};
