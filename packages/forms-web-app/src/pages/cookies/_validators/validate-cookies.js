const { body } = require('express-validator');

const validUsageCookiesOptions = ['on', 'off'];

const ruleUsageCookies = () =>
	body('usage-cookies')
		.if((value) => value)
		.isIn(validUsageCookiesOptions);

const cookiesValidationRules = () => [ruleUsageCookies()];

module.exports = {
	cookiesValidationRules,
	validUsageCookiesOptions
};
