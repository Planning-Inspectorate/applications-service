const { body } = require('express-validator');

const rules = () => {
	return [
		body('telephone')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.theirTelephoneNumber.empty');
			}),
		body('telephone')
			.isLength({ min: 1, max: 255 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.theirTelephoneNumber.length');
			}),
		body('telephone')
			.blacklist('\\s')
			.isNumeric()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.theirTelephoneNumber.format');
			})
	];
};

module.exports = {
	rules
};
