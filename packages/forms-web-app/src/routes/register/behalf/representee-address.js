const express = require('express');

const addressController = require('../../../controllers/register/behalf/representee-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: addressValidationRules,
} = require('../../../validators/register/behalf/representee-address');


const router = express.Router();

router.get('/representee-address', addressController.getAddress);

router.post(
  '/representee-address',
  addressValidationRules(),
  validationErrorHandler,
  addressController.postAddress
);

module.exports = router;