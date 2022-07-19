const { body } = require('express-validator');

const validate = () => {
	return [
		body('comment')
			.isLength({ max: 65234 })
			.withMessage('What you want to tell us must be 65234 characters or less'),
		body('comment')
			.notEmpty()
			.withMessage('Enter what you want to tell us about this proposed project')
	];
};

module.exports = {
	validate
};
