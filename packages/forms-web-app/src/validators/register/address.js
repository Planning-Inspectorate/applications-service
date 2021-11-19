const { body } = require('express-validator');


const rules = () => {
  return [
    body('address-line-1')
      .notEmpty()
      .withMessage('Enter address line 1'),
      body('address-line-2')
      .notEmpty()
      .withMessage('Enter address line 2'),
      body('address-line-3')
      .notEmpty()
      .withMessage('Enter address line 3'),
  ];
};

module.exports = {
  rules,
};
