const { body } = require('express-validator');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

const validHaveSayDuringProjectExaminationOptions = [
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION,
];

const ruleHaveSayDuringProjectExamination = () =>
  body('have-say-during-project-examination')
    .notEmpty()
    .withMessage(
      'Registering to have your say about a national infrastructure project'
    )
    .bail()
    .isIn(validHaveSayDuringProjectExaminationOptions);

const rules = () => [ruleHaveSayDuringProjectExamination()];

module.exports = {
  rules,
  validHaveSayDuringProjectExaminationOptions,
};