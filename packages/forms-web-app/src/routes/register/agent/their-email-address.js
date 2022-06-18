const express = require('express');

const emailController = require('../../../controllers/register/agent/their-email-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	rules: emailValidationRules
} = require('../../../validators/register/agent/their-email-address');

const router = express.Router();

router.get('/their-email-address', emailController.getEmail);

router.post(
	'/their-email-address',
	emailValidationRules(),
	validationErrorHandler,
	emailController.postEmail
);

module.exports = router;
