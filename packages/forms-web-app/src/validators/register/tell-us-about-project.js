const config = require('../../config');
const { body } = require('express-validator');

const validate = () => {
	return [
		body('comment')
			.notEmpty()
			.withMessage('Enter what you want to tell us about this proposed project'),
		body('comment')
			.isLength({ min: 1, max: config.applications.maxCharacters })
			.withMessage(
				`What you want to tell us must be ${config.applications.maxCharacters} characters or less`
			)
	];
};

module.exports = {
	validate
};
