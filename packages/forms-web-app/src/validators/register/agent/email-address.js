const { body } = require('express-validator');

const rules = () => {
  return [
    body('email').notEmpty().withMessage('Enter your email address'),
    body('email')
      .isLength({ min: 3, max: 255 })
      .withMessage('Email address must be between 3 and 255 characters'),
    body('email')
      .isEmail()
      .withMessage('Enter an email address in the correct format, like name@example.com'),
  ];
};

module.exports = {
  rules,
};
