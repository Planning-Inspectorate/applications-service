const express = require('express');

const fullNameController = require('../../../controllers/register/behalf/representee-name');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: fullNameValidationRules,
} = require('../../../validators/register/behalf/representee-name');


const router = express.Router();

router.get('/representee-name', fullNameController.getFullName);

router.post(
  '/representee-name',
  fullNameValidationRules(),
  validationErrorHandler,
  fullNameController.postFullName
);

module.exports = router;