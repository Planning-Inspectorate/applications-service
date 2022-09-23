const { validateNotEmpty } = require('./not-empty');
const { validateNotEmptyAndLength } = require('./not-empty-and-length');
const { emailValidationRules } = require('./email-address');

module.exports = {
	validateNotEmpty,
	validateNotEmptyAndLength,
	emailValidationRules
};
