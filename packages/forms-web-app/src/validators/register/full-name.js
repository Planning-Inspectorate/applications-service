const { body } = require('express-validator');


const rules = () => {
  return [
    body('full-name')
      .notEmpty()
      .withMessage('Please enter your full name'),
  ];
};

module.exports = {
  rules,
};
