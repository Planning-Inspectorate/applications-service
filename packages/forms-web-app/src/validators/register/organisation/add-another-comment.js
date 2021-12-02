const { body } = require('express-validator');

const ruleAddAnotherComment = () =>
  body('add-another-comment')
    .notEmpty()
    .withMessage(
      'Select yes if you want to add another comment'
    );

const rules = () => [ruleAddAnotherComment()];

module.exports = {
  rules,
};
