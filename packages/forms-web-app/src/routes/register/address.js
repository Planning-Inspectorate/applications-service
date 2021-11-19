const express = require('express');

const addressController = require('../../controllers/register/address');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const {
  rules: addressValidationRules,
} = require('../../validators/register/address');


const router = express.Router();

router.get('/address', addressController.getAddress);

router.post(
  '/address',
  addressValidationRules(),
  validationErrorHandler,
  addressController.postAddress
);

module.exports = router;