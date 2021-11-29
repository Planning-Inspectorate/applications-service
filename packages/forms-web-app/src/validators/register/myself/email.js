const { body } = require('express-validator');


const rules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Enter an email address'),
  ];
};

module.exports = {
  rules,
};
