const { body } = require('express-validator');
const { REGISTER } = require('../../constants');

const validTypeOfPartyOptions = [
  REGISTER.TYPE_OF_PARTY.MY_SAY,
  REGISTER.TYPE_OF_PARTY.ORGANISATION,
  REGISTER.TYPE_OF_PARTY.BEHALF_OF_ORGANISATION,
];

const ruleTypeOfParty = () =>
  body('type-of-party')
    .notEmpty()
    .withMessage(
      'Select what type of interested party are you'
    )
    .bail()
    .isIn(validTypeOfPartyOptions);

const rules = () => [ruleTypeOfParty()];

module.exports = {
  rules,
  validTypeOfPartyOptions,
};
