const { body } = require('express-validator');

const emailValidationRules = (object) => {
	const id = object?.id;
	const onError = object?.onError;

	return [
		body(id ?? 'email')
			.notEmpty()
			.withMessage((_, { req }) => {
				return (
					onError?.message?.notEmpty ?? req.i18n.t('common.validationErrors.emailAddress.empty')
				);
			}),
		body(id ?? 'email')
			.isLength(onError?.minMaxOptions ?? { min: 3, max: 255 })
			.withMessage((_, { req }) => {
				return (
					onError?.message?.checkLength ?? req.i18n.t('common.validationErrors.emailAddress.length')
				);
			}),
		body(id ?? 'email')
			.isEmail()
			.withMessage((_, { req }) => {
				return (
					onError?.message?.checkLength ?? req.i18n.t('common.validationErrors.emailAddress.format')
				);
			})
	];
};

module.exports = {
	emailValidationRules
};
