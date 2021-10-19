
const express = require('express');

const haveSayPreApplicationController = require('../../controllers/interested-party-guide/have-say-pre-application');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: haveSayPreApplicationRules,
  } = require('../../validators/interested-party-guide/have-say-pre-application');

const router = express.Router();

router.get('/have-say-pre-application', haveSayPreApplicationController.getHaveSayPreApplication);

router.post(
    '/have-say-pre-application',
    haveSayPreApplicationRules(),
    validationErrorHandler,
    haveSayPreApplicationController.postHaveSayPreApplication
  );

module.exports = router;