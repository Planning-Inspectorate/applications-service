const { body } = require('express-validator');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

const validRegisterToHaveYourSayOptions = [
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.GET_INVOLVED_PRELIMINARY_MEETINGS,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION,
];

const ruleRegisterToHaveYourSay = () =>
  body('register-to-have-your-say')
    .notEmpty()
    .withMessage(
      'Registering to have your say about a national infrastructure project'
    )
    .bail()
    .isIn(validRegisterToHaveYourSayOptions);

const rules = () => [ruleRegisterToHaveYourSay()];

module.exports = {
  rules,
  validRegisterToHaveYourSayOptions,
};