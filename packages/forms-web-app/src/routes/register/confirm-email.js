const express = require('express');

const confirmEmailController = require('../../controllers/register/confirm-email');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { rules: emailValidationRules } = require('../../validators/register/confirm-email');
const { asyncRoute } = require('../../utils/async-route');

const router = express.Router();

router.get('/', confirmEmailController.getConfirmEmail);

router.post(
	'/',
	emailValidationRules(),
	validationErrorHandler,
	asyncRoute(confirmEmailController.postConfirmEmail)
);

module.exports = router;
