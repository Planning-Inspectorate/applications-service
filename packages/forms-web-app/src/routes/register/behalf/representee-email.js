const express = require('express');

const emailController = require('../../../controllers/register/behalf/representee-email');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: emailValidationRules,
} = require('../../../validators/register/behalf/representee-email');


const router = express.Router();

router.get('/representee-email', emailController.getEmail);

router.post(
  '/representee-email',
  emailValidationRules(),
  validationErrorHandler,
  emailController.postEmail
);

module.exports = router;