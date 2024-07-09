const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../routes/config');

const validateSubmittingFor = () => {
	return [
		body(submittingFor.id)
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('examination.submittingFor.errorMessage1');
			})
	];
};

module.exports = {
	validateSubmittingFor
};
