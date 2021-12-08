const { body } = require('express-validator');

const ruleRepresentingFor = () =>
  body('representing')
    .notEmpty()
    .withMessage(
      'Select who are you representing for'
    );

const rules = () => [ruleRepresentingFor()];

module.exports = {
  rules,
};
