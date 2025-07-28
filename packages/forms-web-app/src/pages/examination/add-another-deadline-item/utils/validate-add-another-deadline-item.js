const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: {
				addAnotherDeadlineItem: { id }
			}
		}
	}
} = require('../../../../routes/config');

const validateAddAnotherDeadlineItem = () => {
	return [
		body(id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) =>
				i18n.t('examination.addAnotherDeadlineItem.errorMessage1')
			)
	];
};

module.exports = { validateAddAnotherDeadlineItem };
