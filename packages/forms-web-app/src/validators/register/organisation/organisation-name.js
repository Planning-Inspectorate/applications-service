const { body } = require('express-validator');

const rules = () => {
  return [
    body('organisation-name')
      .notEmpty()
      .withMessage('Enter the name of your organisation or charity'),
  ];
};

module.exports = {
  rules,
};
