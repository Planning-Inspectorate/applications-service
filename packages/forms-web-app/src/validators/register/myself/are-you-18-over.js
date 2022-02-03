const { body } = require('express-validator');

const ruleOver18 = () =>
  body('over-18')
    .notEmpty()
    .withMessage(
      'Select yes if you are 18 or over'
    );

const rules = () => [ruleOver18()];

module.exports = {
  rules,
};
