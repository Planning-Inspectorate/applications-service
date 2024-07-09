const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { applicant }
		}
	}
} = require('../../../../routes/config');
const { getProjectPromoterName } = require('../../../../session');

const validateApplicant = () => {
	return [
		body(applicant.id)
			.notEmpty()
			.withMessage((_, { req }) => {
				const { session } = req;
				return req.i18n.t('examination.applicant.errorMessage1', {
					applicant: getProjectPromoterName(session)
				});
			})
	];
};

module.exports = { validateApplicant };
