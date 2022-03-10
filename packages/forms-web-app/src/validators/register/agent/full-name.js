const { body } = require('express-validator');

const rules = () => {
  return [
    body('full-name').notEmpty().withMessage('Enter your full name'),
    body('full-name')
      .isLength({ min: 3, max: 64 })
      .withMessage('Full name must be between 3 and 64 characters'),
  ];
};

module.exports = {
  rules,
};
