const { body } = require('express-validator');

const emailValidationRules = (object) => {
	const id = object?.id;

	return [
		body(id ?? 'email')
			.notEmpty()
			.withMessage((_, { req }) => req.i18n.t('common.validationErrors.emailAddress.empty')),
		body(id ?? 'email')
			.isLength({ min: 3, max: 255 })
			.withMessage((_, { req }) => req.i18n.t('common.validationErrors.emailAddress.length')),
		body(id ?? 'email')
			.isEmail()
			.withMessage((_, { req }) => req.i18n.t('common.validationErrors.emailAddress.format'))
	];
};

module.exports = {
	emailValidationRules
};
