const { body } = require('express-validator');

const rules = () => {
  return [
    // body('topic')
    //   .notEmpty()
    //   .withMessage('Please enter topic'),
    body('comment').notEmpty().withMessage('Please enter registration comments'),
  ];
};

module.exports = {
  rules,
};
