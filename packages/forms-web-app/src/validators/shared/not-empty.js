const { body } = require('express-validator');

const validateNotEmpty = (id, message) => {
	return [body(id).notEmpty().withMessage(message)];
};

module.exports = {
	validateNotEmpty
};
