const { body } = require('express-validator');

const rules = () => {
	return [
		body('email')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.theirEmailAddress.empty');
			}),
		body('email')
			.isLength({ min: 3, max: 255 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.theirEmailAddress.length');
			}),
		body('email')
			.isEmail()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.theirEmailAddress.format');
			})
	];
};

module.exports = {
	rules
};
