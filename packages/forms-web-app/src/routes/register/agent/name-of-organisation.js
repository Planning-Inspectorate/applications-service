const express = require('express');

const organisationNameController = require('../../../controllers/register/agent/name-of-organisation');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: organisationNameValidationRules,
} = require('../../../validators/agent/name-of-organisation');

const router = express.Router();

router.get('/name-of-organisation', organisationNameController.getOrganisationName);

router.post(
  '/name-of-organisation',
  organisationNameValidationRules(),
  validationErrorHandler,
  organisationNameController.postOrganisationName
);

module.exports = router;
