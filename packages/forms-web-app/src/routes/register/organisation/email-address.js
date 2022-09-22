const express = require('express');

const emailController = require('../../../controllers/register/organisation/email-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { emailValidationRules } = require('../../../validators/shared');

const router = express.Router();

router.get('/email-address', emailController.getEmail);

router.post(
	'/email-address',
	emailValidationRules(),
	validationErrorHandler,
	emailController.postEmail
);

module.exports = router;
