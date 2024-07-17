const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { selectDeadline }
		}
	}
} = require('../../../../routes/config');

const validateExaminationSelectDeadline = () => [
	body(selectDeadline.id)
		.notEmpty()
		.withMessage((_, { req: { i18n } }) => i18n.t('examination.selectDeadline.errorMessage1'))
];

module.exports = { validateExaminationSelectDeadline };
