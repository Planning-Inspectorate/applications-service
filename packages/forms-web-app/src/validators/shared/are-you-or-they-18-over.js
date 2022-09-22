const { body } = require('express-validator');

const over18Rule = (they = false) => [
	body('over-18')
		.notEmpty()
		.withMessage(`Select yes if ${they ? 'they' : 'you'} are 18 or over`)
];

module.exports = {
	over18Rule
};
