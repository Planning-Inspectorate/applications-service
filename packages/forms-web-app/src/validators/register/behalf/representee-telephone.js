const { body } = require('express-validator');

const rules = () => {
  return [body('telephone').notEmpty().withMessage('Enter their telephone number')];
};

module.exports = {
  rules,
};
