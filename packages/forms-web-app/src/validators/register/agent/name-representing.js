const { body } = require('express-validator');

const rules = () => {
	return [
		body('full-name')
			.if(body('representing').matches('person'))
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.namePersonRepresenting.empty');
			}),
		body('full-name')
			.if(body('representing').matches('person'))
			.isLength({ min: 3, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.namePersonRepresenting.length');
			}),
		body('full-name')
			.if(body('representing').matches('organisation'))
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.nameOrganisationRepresenting.empty');
			}),
		body('full-name')
			.if(body('representing').matches('organisation'))
			.isLength({ min: 3, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.nameOrganisationRepresenting.length');
			}),
		body('full-name')
			.if(body('representing').matches('family'))
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.nameHouseholdRepresenting.empty');
			}),
		body('full-name')
			.if(body('representing').matches('family'))
			.isLength({ min: 3, max: 64 })
			.withMessage((_, { req }) => {
				return req.i18n.t('register.validationErrors.nameHouseholdRepresenting.length');
			})
	];
};

module.exports = {
	rules
};
