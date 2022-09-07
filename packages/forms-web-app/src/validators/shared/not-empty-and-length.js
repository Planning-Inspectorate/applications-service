const { body } = require('express-validator');

const validateNotEmptyAndLength = ({ id, onError }) => {
	return [
		body(id).notEmpty().withMessage(onError?.message?.notEmpty),
		body(id).isLength(onError?.minMaxOptions).withMessage(onError?.message?.checkLength)
	];
};

module.exports = {
	validateNotEmptyAndLength
};
