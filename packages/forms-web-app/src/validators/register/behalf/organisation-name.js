const { body } = require('express-validator');

const rules = () => {
  return [
    body('organisation-name')
      .notEmpty()
      .withMessage('Enter the name of the organisation you work for'),
  ];
};

module.exports = {
  rules,
};
