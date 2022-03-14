const { body } = require('express-validator');

const rules = () => {
  return [
    body('organisation-name')
      .notEmpty()
      .withMessage('Enter the name of the organisation you work for'),
    body('organisation-name')
      .isLength({ min: 1, max: 255 })
      .withMessage('The name of the organisation you work for must be 255 characters or less'),
  ];
};

module.exports = {
  rules,
};
