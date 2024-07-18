const { body } = require('express-validator');

const ruleRepresentingFor = () =>
	body('representing')
		.notEmpty()
		.withMessage((_, { req }) => {
			return req.i18n.t('register.validationErrors.whoRepresenting.empty');
		});

const rules = () => [ruleRepresentingFor()];

module.exports = {
	rules
};
