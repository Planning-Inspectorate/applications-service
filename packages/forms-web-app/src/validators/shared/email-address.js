const { body } = require('express-validator');

const emailValidationRules = (object) => {
	const id = object?.id;
	const onError = object?.onError;

	return [
		body(id ?? 'email')
			.notEmpty()
			.withMessage(onError?.message?.notEmpty ?? 'Enter your email address'),
		body(id ?? 'email')
			.isLength(onError?.minMaxOptions ?? { min: 3, max: 255 })
			.withMessage(
				onError?.message?.checkLength ?? 'Email address must be between 3 and 255 characters'
			),
		body(id ?? 'email')
			.trim()
			.isEmail()
			.withMessage('Enter an email address in the correct format, like name@example.com')
	];
};

module.exports = {
	emailValidationRules
};
