const { body } = require('express-validator');

const ruleRepresentingFor = () =>
  body('representing-for')
    .notEmpty()
    .withMessage(
      'Select who are you representing for'
    );

const rules = () => [ruleRepresentingFor()];

module.exports = {
  rules,
};
