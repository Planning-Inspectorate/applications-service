const { body } = require('express-validator');
const { inputNameId } = require('./config');
const { validateHowOftenValue } = require('./utils/validate-how-often-value');

const howOftenValidationRules = () => {
	return [
		body(inputNameId)
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('getUpdatesHowOften.index.validationErrorMessage1');
			}),
		body(inputNameId).custom(validateHowOftenValue)
	];
};

module.exports = {
	howOftenValidationRules
};
