const { body } = require('express-validator');
const { REGISTER } = require('../../constants');

const validTypeOfPartyOptions = [
  REGISTER.TYPE_OF_PARTY.MY_SAY,
  REGISTER.TYPE_OF_PARTY.ORGANISATION,
  REGISTER.TYPE_OF_PARTY.BEHALF,
];

const ruleTypeOfParty = () =>
  body('type-of-party')
    .notEmpty()
    .withMessage('Select who you are registering for')
    .bail()
    .isIn(validTypeOfPartyOptions);

const rules = () => [ruleTypeOfParty()];

module.exports = {
  rules,
  validTypeOfPartyOptions,
};
