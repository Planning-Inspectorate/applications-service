const { body } = require('express-validator');

const rules = () => {
	return [
		body('role')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.jobTitleOrRole.empty');
			}),
		body('role')
			.isLength({ min: 1, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.jobTitleOrRole.length');
			})
	];
};

module.exports = {
	rules
};
