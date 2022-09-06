const { body } = require('express-validator');

const validateInterestedPartyNumber = () => {
	return [
		body('interested-party-number').notEmpty().withMessage('Enter your interested party number'),
		body('interested-party-number')
			.isLength({ min: 3, max: 20 })
			.withMessage('Your interested party number must be between 3 and 20 characters')
	];
};

module.exports = {
	validateInterestedPartyNumber
};
