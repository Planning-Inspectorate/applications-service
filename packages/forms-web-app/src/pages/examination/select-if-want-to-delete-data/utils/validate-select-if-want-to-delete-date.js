const { body } = require('express-validator');

const {
	routesConfig: {
		examination: {
			pages: { selectIfYouWantToDeleteData }
		}
	}
} = require('../../../../routes/config');

const validateSelectIfWantToDeleteData = () => {
	return [
		body(selectIfYouWantToDeleteData.id)
			.notEmpty()
			.withMessage((_, { req }) => req.i18n.t('examination.selectIfWantToDeleteData.errorMessage1'))
	];
};

module.exports = { validateSelectIfWantToDeleteData };
