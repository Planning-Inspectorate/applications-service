const express = require('express');

const addressController = require('../../../controllers/register/agent/address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { rules: addressValidationRules } = require('../../../validators/register/agent/address');

const router = express.Router();

router.get('/address', addressController.getAddress);

router.post(
  '/address',
  addressValidationRules(),
  validationErrorHandler,
  addressController.postAddress
);

module.exports = router;
