const { body } = require('express-validator');

const validateHasInterestedPartyNumber = ({ id }) => {
	return [
		body(id)
			.notEmpty()
			.withMessage((_, { req }) => {
				return req.i18n.t('examination.hasInterestedPartyNumber.errorMessage1');
			})
	];
};

module.exports = {
	validateHasInterestedPartyNumber
};
