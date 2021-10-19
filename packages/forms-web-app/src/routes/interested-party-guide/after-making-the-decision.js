
const express = require('express');

const afterMakingTheDecisionController = require('../../controllers/interested-party-guide/after-making-the-decision');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: afterMakingTheDecisionRules,
  } = require('../../validators/interested-party-guide/after-making-the-decision');

const router = express.Router();

router.get('/after-making-the-decision', afterMakingTheDecisionController.getAfterMakingTheDecision);

router.post(
    '/after-making-the-decision',
    afterMakingTheDecisionRules(),
    validationErrorHandler,
    afterMakingTheDecisionController.postAfterMakingTheDecision
  );
  
  module.exports = router;