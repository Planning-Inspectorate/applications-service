
const express = require('express');

const haveSayDuringProjectExaminationController = require('../../controllers/interested-party-guide/have-say-during-project-examination');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: haveSayDuringProjectExaminationRules,
  } = require('../../validators/interested-party-guide/have-say-during-project-examination');

const router = express.Router();

router.get('/have-say-during-project-examination', haveSayDuringProjectExaminationController.getHaveSayDuringProjectExamination);

router.post(
    '/have-say-during-project-examination',
    haveSayDuringProjectExaminationRules(),
    validationErrorHandler,
    haveSayDuringProjectExaminationController.postHaveSayDuringProjectExamination
  );
  
  module.exports = router;