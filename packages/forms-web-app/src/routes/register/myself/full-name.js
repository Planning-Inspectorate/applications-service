const express = require('express');

const decodeUri = require('../../../middleware/decode-uri');
const fullNameController = require('../../../controllers/register/myself/full-name');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { rules: fullNameValidationRules } = require('../../../validators/shared/full-name');

const router = express.Router();

router.get('/full-name', fullNameController.getFullName);

router.post(
	'/full-name',
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	fullNameController.postFullName
);

module.exports = router;
