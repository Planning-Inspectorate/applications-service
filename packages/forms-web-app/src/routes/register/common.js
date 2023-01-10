const express = require('express');

const { decodeUri } = require('../../middleware/decode-uri');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { rules: fullNameValidationRules } = require('../../validators/shared/full-name');
const fullNameController = require('../../controllers/register/common/full-name/controller');

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
