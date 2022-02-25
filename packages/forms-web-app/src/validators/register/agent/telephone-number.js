const { body } = require('express-validator');

const rules = () => {
  return [body('telephone').notEmpty().withMessage('Enter your telephone number')];
};

module.exports = {
  rules,
};
