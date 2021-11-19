const express = require('express');

const typeOfPartyController = require('../../../controllers/register/type-of-party');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
    rules: typeOfPartyRules,
  } = require('../../../validators/register/type-of-party');

const router = express.Router();

router.get('/type-of-party', typeOfPartyController.getTypeOfParty);

router.post(
    '/type-of-party',
    typeOfPartyRules(),
    validationErrorHandler,
    typeOfPartyController.postTypeOfParty
  );

module.exports = router;