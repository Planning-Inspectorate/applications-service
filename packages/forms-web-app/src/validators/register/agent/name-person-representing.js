const { body } = require('express-validator');

const rules = () => {
	return [
		body('full-name')
			.if(body('representing').matches('person'))
			.notEmpty()
			.withMessage('Enter the full name of the person you are representing'),
		body('full-name')
			.if(body('representing').matches('person'))
			.isLength({ min: 3, max: 64 })
			.withMessage(
				'Full name of the person you are representing must be between 3 and 64 characters'
			),
		body('full-name')
			.if(body('representing').matches('organisation'))
			.notEmpty()
			.withMessage('Enter the full name of the organisation you are representing'),
		body('full-name')
			.if(body('representing').matches('organisation'))
			.isLength({ min: 3, max: 64 })
			.withMessage(
				'Full name of the organisation you are representing must be between 3 and 64 characters'
			),
		body('full-name')
			.if(body('representing').matches('family'))
			.notEmpty()
			.withMessage('Enter the name of the family group you are representing'),
		body('full-name')
			.if(body('representing').matches('family'))
			.isLength({ min: 3, max: 64 })
			.withMessage(
				'Full name of the family group you are representing must be between 3 and 64 characters'
			)
	];
};

module.exports = {
	rules
};
