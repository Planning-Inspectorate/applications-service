const { body } = require('express-validator');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

const validInterestedPartyOptions = [
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_PRE_APPLICATION,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.REGISTER_TO_HAVE_YOUR_SAY,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.GET_INVOLVED_PRELIMINARY_MEETINGS,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION,
];

const ruleInterestedParty = () =>
  body('interested-party')
    .notEmpty()
    .withMessage(
      'Having your say about a national infrastructure project'
    )
    .bail()
    .isIn(validInterestedPartyOptions);

const rules = () => [ruleInterestedParty()];

module.exports = {
  rules,
  validInterestedPartyOptions,
};