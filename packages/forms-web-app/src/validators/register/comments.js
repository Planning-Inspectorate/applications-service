const { body } = require('express-validator');


const rules = () => {
  return [
    body('comments')
      .notEmpty()
      .withMessage('Enter comments'),
  ];
};

module.exports = {
  rules,
};
