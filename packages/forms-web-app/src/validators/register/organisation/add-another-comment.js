const { body } = require('express-validator');

const rules = () => {
  return [
    body('add-another-comment')
     .notEmpty()
     .withMessage('Select yes if you want to add another comment'),
    body('length')
     .if(body('add-another-comment').matches('no'))
     .isInt({ min:1})
     .withMessage('You should add atleast one comment'),
  ];
};

module.exports = {
  rules,
};
