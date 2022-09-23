const { body } = require('express-validator');

const addressValidationRules = () => {
	return [
		body('line1').notEmpty().withMessage('Enter address line 1'),
		body('line1')
			.isLength({ min: 1, max: 255 })
			.withMessage('Address line 1 must be 255 characters or less'),

		body('line2')
			.isLength({ min: 0, max: 96 })
			.withMessage('Address line 2 must be 96 characters or less'),

		body('line3')
			.isLength({ min: 0, max: 64 })
			.withMessage('Address line 3 must be 64 characters or less'),

		body('postcode').notEmpty().withMessage('Enter a postcode'),
		body('postcode')
			.isLength({ min: 1, max: 16 })
			.withMessage('Postcode must be 16 characters or less'),

		body('country').notEmpty().withMessage('Enter a country'),
		body('country')
			.isLength({ min: 1, max: 64 })
			.withMessage('Country must be 64 characters or less')
	];
};

module.exports = {
	addressValidationRules
};
