const express = require('express');

const telephoneController = require('../../../controllers/register/agent/telephone-number');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	rules: telephoneValidationRules
} = require('../../../validators/register/agent/telephone-number');

const router = express.Router();

router.get('/telephone-number', telephoneController.getTelephone);

router.post(
	'/telephone-number',
	telephoneValidationRules(),
	validationErrorHandler,
	telephoneController.postTelephone
);

module.exports = router;
