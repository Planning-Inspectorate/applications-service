const express = require('express');

const addressController = require('../../../controllers/register/organisation/address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { addressValidationRules } = require('../../../validators/shared');

const router = express.Router();

router.get('/address', addressController.getAddress);

router.post(
	'/address',
	addressValidationRules(),
	validationErrorHandler,
	addressController.postAddress
);

module.exports = router;
