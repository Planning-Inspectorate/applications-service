const express = require('express');

const { decodeUri } = require('../../middleware/decode-uri');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { rules: fullNameValidationRules } = require('../../validators/shared/full-name');
const fullNameController = require('../../controllers/register/common/full-name/controller');
const { rules: addressValidationRules } = require('../../validators/register/myself/address');
const addressController = require('../../controllers/register/common/address/controller');
const { emailValidationRules } = require('../../validators/shared/email-address');
const emailController = require('../../controllers/register/common/email-address/controller');

const router = express.Router();

router.get('/full-name', fullNameController.getFullName);
router.post(
	'/full-name',
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	fullNameController.postFullName
);

router.get('/address', addressController.getAddress);

router.post(
	'/address',
	addressValidationRules(),
	validationErrorHandler,
	addressController.postAddress
);

router.get('/email-address', emailController.getEmailAddress);

router.post(
	'/email-address',
	emailValidationRules(),
	validationErrorHandler,
	emailController.postEmailAddress
);

module.exports = router;
