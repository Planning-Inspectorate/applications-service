const express = require('express');

const telephoneController = require('../../../controllers/register/organisation/telephone');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: telephoneValidationRules,
} = require('../../../validators/register/organisation/telephone');


const router = express.Router();

router.get('/telephone', telephoneController.getTelephone);

router.post(
  '/telephone',
  telephoneValidationRules(),
  validationErrorHandler,
  telephoneController.postTelephone
);

module.exports = router;