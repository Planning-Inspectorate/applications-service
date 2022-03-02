const express = require('express');

const fullNameController = require('../../../controllers/register/agent/name-person-representing');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: fullNameValidationRules,
} = require('../../../validators/register/agent/name-person-representing');

const router = express.Router();

router.get('/name-person-representing', fullNameController.getFullName);

router.post(
  '/name-person-representing',
  fullNameValidationRules(),
  validationErrorHandler,
  fullNameController.postFullName
);

router.get('/name-family-group-representing', fullNameController.getFullName);

router.post(
  '/name-family-group-representing',
  fullNameValidationRules(),
  validationErrorHandler,
  fullNameController.postFullName
);

router.get('/name-organisation-representing', fullNameController.getFullName);

router.post(
  '/name-organisation-representing',
  fullNameValidationRules(),
  validationErrorHandler,
  fullNameController.postFullName
);

module.exports = router;
