const { body } = require('express-validator');

const rules = () => {
  return [body('role').notEmpty().withMessage('Enter your job title or volunteer role')];
};

module.exports = {
  rules,
};
