const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { enterComment }
		}
	}
} = require('../../../../routes/config');

const validateEnterComment = () => [
	body(enterComment.id)
		.notEmpty()
		.withMessage((_, { req }) => req.i18n.t('examination.enterComment.errorMessage1')),
	body(enterComment.id)
		.isLength({
			min: 1,
			max: 65234
		})
		.withMessage((_, { req }) => req.i18n.t('examination.enterComment.errorMessage2'))
];

module.exports = { validateEnterComment };
