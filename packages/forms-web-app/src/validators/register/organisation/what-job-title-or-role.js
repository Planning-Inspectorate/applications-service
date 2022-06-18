const { body } = require('express-validator');

const rules = () => {
	return [
		body('role').notEmpty().withMessage('Enter your job title or volunteer role'),
		body('role')
			.isLength({ min: 1, max: 64 })
			.withMessage('Your job title or volunteer role must be 64 characters or less')
	];
};

module.exports = {
	rules
};
