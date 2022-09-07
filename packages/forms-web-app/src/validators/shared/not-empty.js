const { body } = require('express-validator');

const validateNotEmpty = ({ id, onError }) => {
	return [body(id).notEmpty().withMessage(onError?.message?.isEmpty)];
};

module.exports = {
	validateNotEmpty
};
