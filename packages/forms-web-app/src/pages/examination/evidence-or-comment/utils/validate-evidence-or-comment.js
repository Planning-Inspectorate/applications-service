const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const validateEvidenceOrComment = () => {
	return [
		body(evidenceOrComment.id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) => {
				return i18n.t('examination.evidenceOrComment.errorMessage1');
			})
	];
};

module.exports = { validateEvidenceOrComment };
