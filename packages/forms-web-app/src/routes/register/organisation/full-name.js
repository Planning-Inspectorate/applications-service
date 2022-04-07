const express = require('express');

const fullNameController = require('../../../controllers/register/organisation/full-name');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: fullNameValidationRules,
} = require('../../../validators/register/organisation/full-name');

const router = express.Router();

router.get('/full-name', fullNameController.getFullName);

router.post(
  '/full-name',
  fullNameValidationRules(),
  validationErrorHandler,
  fullNameController.postFullName
);

module.exports = router;
