const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { email }
		}
	}
} = require('../../../../routes/config');

const validateExaminationEmail = () => {
	return [
		body(email.id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) => i18n.t('examination.name.agent.errorMessage1')),
		body(email.id)
			.isLength({
				min: 1,
				max: 255
			})
			.withMessage((_, { req: { i18n } }) => i18n.t('examination.name.agent.errorMessage2'))
	];
};

module.exports = { validateExaminationEmail };
