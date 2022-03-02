const express = require('express');

const addressController = require('../../../controllers/register/agent/their-postal-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: addressValidationRules,
} = require('../../../validators/register/agent/their-postal-address');

const router = express.Router();

router.get('/their-postal-address', addressController.getAddress);

router.post(
  '/their-postal-address',
  addressValidationRules(),
  validationErrorHandler,
  addressController.postAddress
);

module.exports = router;
