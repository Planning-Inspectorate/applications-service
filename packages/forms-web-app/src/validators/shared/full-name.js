const { body } = require('express-validator');

const rules = () => {
	return [
		body('full-name')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.fullName.empty');
			}),
		body('full-name')
			.isLength({ min: 3, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.fullName.length');
			})
	];
};

module.exports = {
	rules
};
