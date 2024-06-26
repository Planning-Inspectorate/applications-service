const { body } = require('express-validator');
const { registeringForOptions } = require('../config');

const validateRegisteringForOptions = () => [
	body('type-of-party')
		.notEmpty()
		.withMessage((_, { req }) => {
			return req.i18n.t('common.validationErrors.registeringFor.empty');
		})
		.bail()
		.isIn(Object.values(registeringForOptions))
];

module.exports = { validateRegisteringForOptions };
