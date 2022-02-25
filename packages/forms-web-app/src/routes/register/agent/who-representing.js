const express = require('express');

const representingForController = require('../../../controllers/register/agent/who-representing');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
  rules: representingForRules,
} = require('../../../validators/register/agent/who-representing');

const router = express.Router();

router.get('/who-representing', representingForController.getRepresentingFor);

router.post(
  '/who-representing',
  representingForRules(),
  validationErrorHandler,
  representingForController.postRepresentingFor
);

module.exports = router;
