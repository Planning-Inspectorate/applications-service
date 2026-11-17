const { body } = require('express-validator');

const ruleAiDeclaration = () =>
	body('ai-declaration')
		.notEmpty()
		.withMessage((_, { req }) => {
			return req.i18n.t('common.validationErrors.aiUsageDeclaration');
		});

const rules = () => [ruleAiDeclaration()];

module.exports = {
	rules
};
