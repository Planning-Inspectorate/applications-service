const { body } = require('express-validator');

const validateNotEmptyAndLength = ({ notEmpty, checkLength, id, options }) => {
	return [
		body(id).notEmpty().withMessage(notEmpty),
		body(id).isLength(options).withMessage(checkLength)
	];
};

const validateNotEmpty = (id, message) => {
	return [body(id).notEmpty().withMessage(message)];
};

module.exports = {
	validateNotEmpty,
	validateNotEmptyAndLength
};
