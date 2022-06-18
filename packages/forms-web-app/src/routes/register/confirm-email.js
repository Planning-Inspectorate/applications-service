const express = require('express');

const confirmEmailController = require('../../controllers/register/confirm-email');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { rules: emailValidationRules } = require('../../validators/register/confirm-email');

const router = express.Router();

router.get('/', confirmEmailController.getConfirmEmail);

router.post(
	'/',
	emailValidationRules(),
	validationErrorHandler,
	confirmEmailController.postConfirmEmail
);

module.exports = router;
