const { body } = require('express-validator');


const rules = () => {
  return [
    body('full-name')
      .notEmpty()
      .withMessage('Enter their full name'),
  ];
};

module.exports = {
  rules,
};
