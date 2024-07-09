const { body } = require('express-validator');

const validateYourInterestedPartyNumber = ({ id }) => {
	const minMaxOptions = {
		min: 3,
		max: 20
	};
	return [
		body(id)
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('examination.yourInterestedPartyNumber.errorMessage1');
			}),
		body(id)
			.isLength(minMaxOptions)
			.withMessage((_, { req }) => {
				return req.i18n.t('examination.yourInterestedPartyNumber.errorMessage2');
			})
	];
};

module.exports = {
	validateYourInterestedPartyNumber
};
