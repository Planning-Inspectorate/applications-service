const { body } = require('express-validator');


const rules = () => {
  return [
    body('organisation-name')
      .notEmpty()
      .withMessage('Enter your organisation name'),
  ];
};

module.exports = {
  rules,
};
