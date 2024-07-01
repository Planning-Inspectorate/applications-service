const { body } = require('express-validator');

const rules = () => {
	return [
		body('line1')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.line1Empty');
			}),
		body('line1')
			.isLength({ min: 1, max: 255 })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.line1Length');
			}),

		body('line2')
			.isLength({ min: 0, max: 96 })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.line2Length');
			}),
		body('line3')
			.isLength({ min: 0, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.line3Length');
			}),
		body('postcode')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.postcodeEmpty');
			}),
		body('postcode')
			.isLength({ min: 1, max: 16 })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.postcodeLength');
			}),
		body('country')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.countryEmpty');
			}),
		body('country')
			.isLength({ min: 1, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.address.countryLength');
			})
	];
};

module.exports = {
	rules
};
