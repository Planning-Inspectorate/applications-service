const { body } = require('express-validator');

const validatePersonalInformation = ({ id }) => {
	return [
		body(id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) =>
				i18n.t('examination.personalInformation.errorMessage1')
			)
	];
};

module.exports = { validatePersonalInformation };
