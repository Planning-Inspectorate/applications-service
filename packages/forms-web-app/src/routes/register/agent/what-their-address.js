const express = require('express');

const addressController = require('../../../controllers/register/agent/what-their-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: addressValidationRules,
} = require('../../../validators/register/agent/what-their-address');

const router = express.Router();

router.get('/what-their-address', addressController.getAddress);

router.post(
  '/what-their-address',
  addressValidationRules(),
  validationErrorHandler,
  addressController.postAddress
);

module.exports = router;
