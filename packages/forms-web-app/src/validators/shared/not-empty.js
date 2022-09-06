const { body } = require('express-validator');

const notEmpty = (id, message) => {
	return body(id).notEmpty().withMessage(message);
};

const rules = (id, message) => [notEmpty(id, message)];

module.exports = {
	rules
};
