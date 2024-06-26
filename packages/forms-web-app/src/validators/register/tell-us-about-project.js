const config = require('../../config');
const { body } = require('express-validator');

const validate = () => {
	return [
		body('comment')
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.aboutProject.empty');
			}),
		body('comment')
			.isLength({ min: 1, max: config.applications.maxCharacters })
			.withMessage((_, { req }) => {
				return req.i18n.t('common.validationErrors.aboutProject.length', {
					maxCharacters: config.applications.maxCharacters
				});
			})
	];
};

module.exports = {
	validate
};
