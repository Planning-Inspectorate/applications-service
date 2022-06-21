const { body } = require('express-validator');

const rules = () => {
	return [
		body('organisation-name').notEmpty().withMessage('Enter your organisation or charity name'),
		body('organisation-name')
			.isLength({ min: 1, max: 255 })
			.withMessage('Name of your organisation or charity name must be 255 characters or less')
	];
};

module.exports = {
	rules
};
