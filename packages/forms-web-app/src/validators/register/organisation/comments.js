const { body } = require('express-validator');

const rules = () => {
  return [body('comment').notEmpty().withMessage('Please enter comments')];
};

module.exports = {
  rules,
};
