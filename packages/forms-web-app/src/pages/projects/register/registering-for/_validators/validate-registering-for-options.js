const { body } = require('express-validator');
const { REGISTER } = require('../../../../../constants');

const registeringForOptions = [
	REGISTER.TYPE_OF_PARTY.MY_SAY,
	REGISTER.TYPE_OF_PARTY.ORGANISATION,
	REGISTER.TYPE_OF_PARTY.AGENT
];

const validateRegisteringForOptions = () => [
	body('type-of-party')
		.notEmpty()
		.withMessage('Select who you are registering for')
		.bail()
		.isIn(registeringForOptions)
];

module.exports = { validateRegisteringForOptions, registeringForOptions };
