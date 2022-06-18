const { body } = require('express-validator');

const ruleRepresentingFor = () =>
	body('representing').notEmpty().withMessage('Select who you are representing');

const rules = () => [ruleRepresentingFor()];

module.exports = {
	rules
};
