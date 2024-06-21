const { body } = require('express-validator');

const ruleOver18 = () =>
	body('over-18')
		.notEmpty()
		.withMessage((_, { req }) => {
			return req.i18n.t('common.validationErrors.areYou18');
		});

const rules = () => [ruleOver18()];

module.exports = {
	rules
};
