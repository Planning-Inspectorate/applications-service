const express = require('express');

const { decodeUri } = require('../../middleware/decode-uri');
const { rules: over18Rules } = require('../../validators/register/organisation/are-you-18-over');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { emailValidationRules } = require('../../validators/shared/email-address');
const { rules: fullNameValidationRules } = require('../../validators/shared/full-name');
const fullNameController = require('../../controllers/register/common/full-name/controller');
const areYouOver18Controller = require('../../controllers/register/common/are-you-over-18/controller');
const emailAddressController = require('../../controllers/register/common/email-address/controller');

const router = express.Router();

router.get('/full-name', fullNameController.get);
router.post(
	'/full-name',
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	fullNameController.post
);

router.get('/are-you-18-over', areYouOver18Controller.get);
router.post('/are-you-18-over', over18Rules(), validationErrorHandler, areYouOver18Controller.post);

router.get('/email-address', emailAddressController.get);
router.post(
	'/email-address',
	emailValidationRules(),
	validationErrorHandler,
	emailAddressController.post
);

module.exports = router;
