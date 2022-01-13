const { body } = require('express-validator');

const rules = () => {
  return [body('comment').notEmpty().withMessage('Please enter registration comments')];
};

module.exports = {
  rules,
};
