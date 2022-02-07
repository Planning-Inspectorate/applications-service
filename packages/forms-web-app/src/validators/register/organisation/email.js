const { body } = require('express-validator');

const rules = () => {
  return [body('email').notEmpty().withMessage('Enter your email address')];
};

module.exports = {
  rules,
};
