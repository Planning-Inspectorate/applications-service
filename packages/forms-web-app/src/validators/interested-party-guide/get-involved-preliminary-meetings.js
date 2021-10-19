const { body } = require('express-validator');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

const validGetInvolvedPreliminaryMeetingsOptions = [
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.HAVE_SAY_DURING_PROJECT_EXAMINATION,
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION,
];

const ruleGetInvolvedPreliminaryMeetings = () =>
  body('get-involved-preliminary-meetings')
    .notEmpty()
    .withMessage(
      'Registering to have your say about a national infrastructure project'
    )
    .bail()
    .isIn(validGetInvolvedPreliminaryMeetingsOptions);

const rules = () => [ruleGetInvolvedPreliminaryMeetings()];

module.exports = {
  rules,
  validGetInvolvedPreliminaryMeetingsOptions,
};