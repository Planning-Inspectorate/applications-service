const { body } = require('express-validator');

const rules = () => {
	return [
		body('telephone').notEmpty().withMessage('Enter your telephone number'),
		body('telephone')
			.isLength({ min: 1, max: 255 })
			.withMessage('Telephone number must be 255 characters or less'),
		body('telephone')
			.blacklist('\\s')
			.isNumeric()
			.withMessage('Enter a telephone number, like 01632 960 001, 07700 900 982 or 44 808 157 0192')
	];
};

module.exports = {
	rules
};
