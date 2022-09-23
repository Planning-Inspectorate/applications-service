const express = require('express');

const telephoneController = require('../../../controllers/register/myself/telephone');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { telephoneValidationRules } = require('../../../validators/shared');

const router = express.Router();

router.get('/telephone', telephoneController.getTelephone);

router.post(
	'/telephone',
	telephoneValidationRules(),
	validationErrorHandler,
	telephoneController.postTelephone
);

module.exports = router;
