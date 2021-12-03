const { body } = require('express-validator');


const rules = () => {
  return [
    body('add-another-comment')
    .notEmpty()
    .withMessage('Select yes if you want to add another comment'),
    // body('length')
    // .isInt({ min:1, max: 16})
    // .withMessage('Enter atleast one comment'),
  ];
};

module.exports = {
  rules,
};
