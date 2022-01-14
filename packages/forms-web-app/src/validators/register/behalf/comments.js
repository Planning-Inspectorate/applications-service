const { body } = require('express-validator');

const rules = () => {
  return [body('comment').notEmpty().withMessage('Please enter comment')];
};

module.exports = {
  rules,
};
