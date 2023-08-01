const { body } = require('express-validator');
const { inputNameId, validationErrorMessage } = require('./config');
const { validateHowOftenValue } = require('./utils/validate-how-often-value');

const howOftenValidationRules = () => {
	return [
		body(inputNameId).notEmpty().withMessage(validationErrorMessage),
		body(inputNameId).custom(validateHowOftenValue)
	];
};

module.exports = {
	howOftenValidationRules
};
