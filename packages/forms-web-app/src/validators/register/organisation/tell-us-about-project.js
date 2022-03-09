const { body } = require('express-validator');

const rules = () => {
  return [
    body('comment')
      .notEmpty()
      .withMessage('Enter what you want to tell us about this proposed project'),
    body('comment')
      .isLength({ min: 1, max: 65234 })
      .withMessage('What you want to tell us must be 65234 characters or less'),
  ];
};

module.exports = {
  rules,
};
