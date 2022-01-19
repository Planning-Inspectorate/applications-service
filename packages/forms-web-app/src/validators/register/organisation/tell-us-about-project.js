const { body } = require('express-validator');

const rules = () => {
  return [
    body('comment')
      .notEmpty()
      .withMessage('Enter what you want to tell us about this proposed project'),
  ];
};

module.exports = {
  rules,
};
