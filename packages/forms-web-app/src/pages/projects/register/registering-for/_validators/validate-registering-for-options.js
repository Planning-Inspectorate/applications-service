const { body } = require('express-validator');
const { registeringForOptions } = require('../config');

const validateRegisteringForOptions = () => [
	body('type-of-party')
		.notEmpty()
		.withMessage('Select who you are registering for')
		.bail()
		.isIn(Object.values(registeringForOptions))
];

module.exports = { validateRegisteringForOptions };
