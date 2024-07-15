const { body } = require('express-validator');

const rules = () => {
	return [
		body('organisation-name')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.organisationOrCharityName.empty');
			}),
		body('organisation-name')
			.isLength({ min: 1, max: 255 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.organisationOrCharityName.length');
			})
	];
};

module.exports = {
	rules
};
