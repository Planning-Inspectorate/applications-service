const { body } = require('express-validator');


const rules = () => {
  return [
    body('line1')
      .notEmpty()
      .withMessage('Enter address line 1'),
      body('postcode')
      .notEmpty()
      .withMessage('Enter address postcode'),
      body('country')
      .notEmpty()
      .withMessage('Enter address country'),
  ];
};

module.exports = {
  rules,
};
