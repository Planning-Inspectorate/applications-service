const { validateNotEmpty } = require('./not-empty');
const { validateNotEmptyAndLength } = require('./not-empty-and-length');
const { emailValidationRules } = require('./email-address');
const { addressValidationRules } = require('./address');
const { over18Rule } = require('./are-you-or-they-18-over');
const { telephoneValidationRules } = require('./telephone-number');

module.exports = {
	validateNotEmpty,
	validateNotEmptyAndLength,
	emailValidationRules,
	addressValidationRules,
	over18Rule,
	telephoneValidationRules
};
