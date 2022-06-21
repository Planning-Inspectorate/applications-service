const express = require('express');

const telephoneController = require('../../../controllers/register/myself/telephone');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	rules: telephoneValidationRules
} = require('../../../validators/register/myself/telephone');

const router = express.Router();

router.get('/telephone', telephoneController.getTelephone);

router.post(
	'/telephone',
	telephoneValidationRules(),
	validationErrorHandler,
	telephoneController.postTelephone
);

module.exports = router;
