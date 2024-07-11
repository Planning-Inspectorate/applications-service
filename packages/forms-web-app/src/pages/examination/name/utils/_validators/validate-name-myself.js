const { body } = require('express-validator');

const validateNameMyself = (id) => {
	return [
		body(id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) => i18n.t('examination.name.myself.errorMessage1')),
		body(id)
			.isLength({
				min: 3,
				max: 64
			})
			.withMessage((_, { req: { i18n } }) => i18n.t('examination.name.myself.errorMessage2'))
	];
};

module.exports = { validateNameMyself };
