const express = require('express');

const { decodeUri } = require('../../middleware/decode-uri');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { rules: fullNameValidationRules } = require('../../validators/shared/full-name');
const fullNameController = require('../../controllers/register/common/full-name/controller');
const { rules: addressValidationRules } = require('../../validators/register/myself/address');
const addressController = require('../../controllers/register/common/address/controller');
const { emailValidationRules } = require('../../validators/shared/email-address');
const emailController = require('../../controllers/register/common/email-address/controller');
const { rules: over18Rules } = require('../../validators/register/myself/are-you-18-over');
const areYouOver18Controller = require('../../controllers/register/common/are-you-18/controller');
const { rules: telephoneValidationRules } = require('../../validators/register/myself/telephone');
const telephoneNumberController = require('../../controllers/register/common/telephone-number/controller');

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

router.get('/are-you-18-over', areYouOver18Controller.getAreYouOver18);

router.post(
	'/are-you-18-over',
	over18Rules(),
	validationErrorHandler,
	areYouOver18Controller.postAreYouOver18
);

router.get('/telephone-number', telephoneNumberController.getTelephoneNumber);

router.post(
	'/telephone-number',
	telephoneValidationRules(),
	validationErrorHandler,
	telephoneNumberController.postTelephoneNumber
);

module.exports = router;
