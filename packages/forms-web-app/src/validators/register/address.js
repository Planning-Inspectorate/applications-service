const { body } = require('express-validator');


const rules = () => {
  return [
    body('address-line-1')
      .notEmpty()
      .withMessage('Enter address line 1'),
      body('address-postcode')
      .notEmpty()
      .withMessage('Enter address postcode'),
      body('address-country')
      .notEmpty()
      .withMessage('Enter address country'),
  ];
};

module.exports = {
  rules,
};
