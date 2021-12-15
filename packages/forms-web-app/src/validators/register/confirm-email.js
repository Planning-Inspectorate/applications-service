const { body } = require('express-validator');


const rules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Confirm your email address'),
  ];
};

module.exports = {
  rules,
};
