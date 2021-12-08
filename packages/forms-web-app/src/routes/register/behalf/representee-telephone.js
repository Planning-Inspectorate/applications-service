const express = require('express');

const telephoneController = require('../../../controllers/register/behalf/representee-telephone');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: telephoneValidationRules,
} = require('../../../validators/register/behalf/representee-telephone');


const router = express.Router();

router.get('/representee-telephone', telephoneController.getTelephone);

router.post(
  '/representee-telephone',
  telephoneValidationRules(),
  validationErrorHandler,
  telephoneController.postTelephone
);

module.exports = router;