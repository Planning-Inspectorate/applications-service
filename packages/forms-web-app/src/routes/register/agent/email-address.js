const express = require('express');

const emailController = require('../../../controllers/register/agent/email-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { rules: emailValidationRules } = require('../../../validators/register/agent/email-address');

const router = express.Router();

router.get('/email-address', emailController.getEmail);

router.post(
	'/email-address',
	emailValidationRules(),
	validationErrorHandler,
	emailController.postEmail
);

module.exports = router;
