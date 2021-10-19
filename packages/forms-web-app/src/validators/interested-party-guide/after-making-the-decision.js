const { body } = require('express-validator');
const { INTERESTED_PARTY_GUIDE } = require('../../constants');

const validAfterMakingTheDecisionOptions = [
  INTERESTED_PARTY_GUIDE.INTERESTED_PARTY.AFTER_MAKING_THE_DECISION,
];

const ruleAfterMakingTheDecision = () =>
  body('after-making-the-decision')
    .notEmpty()
    .withMessage(
      'Registering to have your say about a national infrastructure project'
    )
    .bail()
    .isIn(validAfterMakingTheDecisionOptions);

const rules = () => [ruleAfterMakingTheDecision()];

module.exports = {
  rules,
  validAfterMakingTheDecisionOptions,
};