const { body } = require('express-validator');

const ruleOver18 = () =>
	body('over-18')
		.notEmpty()
		.withMessage((_, { req }) => {
			return req.i18n.t('register.validationErrors.areThey18.empty');
		});

const rules = () => [ruleOver18()];

module.exports = {
	rules
};
