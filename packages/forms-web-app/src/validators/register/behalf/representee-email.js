const { body } = require('express-validator');


const rules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Enter their email address'),
  ];
};

module.exports = {
  rules,
};
