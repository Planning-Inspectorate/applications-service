const { body } = require('express-validator');


const rules = () => {
  return [
    body('full-name')
      .if(body('representing').matches('person'))
      .notEmpty()
      .withMessage('Enter the full name of the person you are representing'),
    body('full-name')
      .if(body('representing').matches('organisation'))
      .notEmpty()
      .withMessage('Enter the full name of the organisation you are representing'),
    body('full-name')
      .if(body('representing').matches('family'))
      .notEmpty()
      .withMessage('Enter the name of the family group you are representing'),  
  ];
};

module.exports = {
  rules,
};
