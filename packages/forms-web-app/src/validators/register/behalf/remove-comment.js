const { body } = require('express-validator');

const ruleRemoveComment = () =>
  body('remove-comment')
    .notEmpty()
    .withMessage(
      'Select yes if you wnat to remove this comment'
    );

const rules = () => [ruleRemoveComment()];

module.exports = {
  rules,
};
