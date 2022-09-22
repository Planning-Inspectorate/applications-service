const { validateNotEmpty } = require('./not-empty');
const { validateNotEmptyAndLength } = require('./not-empty-and-length');
const { addressValidationRules } = require('./address');
const { over18Rule } = require('./are-you-or-they-18-over');

module.exports = {
	validateNotEmpty,
	validateNotEmptyAndLength,
	addressValidationRules,
	over18Rule
};
