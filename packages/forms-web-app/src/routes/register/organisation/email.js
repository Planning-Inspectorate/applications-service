const express = require('express');

const emailController = require('../../../controllers/register/organisation/email');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: emailValidationRules,
} = require('../../../validators/register/organisation/email');


const router = express.Router();

router.get('/email', emailController.getEmail);

router.post(
  '/email',
  emailValidationRules(),
  validationErrorHandler,
  emailController.postEmail
);

module.exports = router;