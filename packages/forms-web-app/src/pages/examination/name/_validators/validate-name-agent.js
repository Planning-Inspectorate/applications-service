const { body } = require('express-validator');

const validateNameAgent = (id) => {
	return [
		body(id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) => i18n.t('examination.name.agent.errorMessage1')),
		body(id)
			.isLength({
				min: 1,
				max: 255
			})
			.withMessage((_, { req: { i18n } }) => i18n.t('examination.name.agent.errorMessage2'))
	];
};

module.exports = { validateNameAgent };
