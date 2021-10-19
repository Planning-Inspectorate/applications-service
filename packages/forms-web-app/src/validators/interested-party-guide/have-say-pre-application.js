const { body } = require('express-validator');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

const validHaveSayPreApplicationOptions = [
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.REGISTER_TO_HAVE_YOUR_SAY,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.GET_INVOLVED_PRELIMINARY_MEETINGS,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION,
];

const ruleHaveSayPreApplication = () =>
  body('have-say-pre-application')
    .notEmpty()
    .withMessage(
      'Having your say at the pre-application stage'
    )
    .bail()
    .isIn(validHaveSayPreApplicationOptions);

const rules = () => [ruleHaveSayPreApplication()];

module.exports = {
  rules,
  validHaveSayPreApplicationOptions,
};