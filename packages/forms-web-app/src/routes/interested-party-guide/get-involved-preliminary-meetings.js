
const express = require('express');

const getInvolvedPreliminaryMeetingsController = require('../../controllers/interested-party-guide/get-involved-preliminary-meetings');
const { validationErrorHandler } = require('../../validators/validation-error-handler');

const {
    rules: getInvolvedPreliminaryMeetingsRules,
  } = require('../../validators/interested-party-guide/get-involved-preliminary-meetings');

const router = express.Router();

router.get('/get-involved-preliminary-meetings', getInvolvedPreliminaryMeetingsController.getGetInvolvedPreliminaryMeetings);

router.post(
    '/get-involved-preliminary-meetings',
    getInvolvedPreliminaryMeetingsRules(),
    validationErrorHandler,
    getInvolvedPreliminaryMeetingsController.postGetInvolvedPreliminaryMeetings
  );
  
  module.exports = router;