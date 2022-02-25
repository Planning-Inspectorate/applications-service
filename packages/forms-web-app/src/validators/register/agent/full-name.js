const { body } = require('express-validator');

const rules = () => {
  return [body('full-name').notEmpty().withMessage('Enter your full name')];
};

module.exports = {
  rules,
};
