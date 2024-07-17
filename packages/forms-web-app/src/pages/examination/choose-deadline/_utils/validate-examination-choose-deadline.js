const { body } = require('express-validator');

const { chooseDeadlineId } = require('../config');

const validateExaminationChooseDeadline = () => [
	body(chooseDeadlineId)
		.notEmpty()
		.withMessage((_, { req: { i18n } }) => i18n.t('examination.chooseDeadline.errorMessage1'))
];

module.exports = { validateExaminationChooseDeadline };
