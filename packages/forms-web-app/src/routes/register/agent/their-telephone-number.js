const express = require('express');

const telephoneController = require('../../../controllers/register/agent/their-telephone-number');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { telephoneValidationRules } = require('../../../validators/shared');

const router = express.Router();

router.get('/their-telephone-number', telephoneController.getTelephone);

router.post(
	'/their-telephone-number',
	telephoneValidationRules(),
	validationErrorHandler,
	telephoneController.postTelephone
);

module.exports = router;
