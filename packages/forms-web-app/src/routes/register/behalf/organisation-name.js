const express = require('express');

const organisationNameController = require('../../../controllers/register/behalf/organisation-name');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: organisationNameValidationRules,
} = require('../../../validators/register/behalf/organisation-name');


const router = express.Router();

router.get('/organisation-name', organisationNameController.getOrganisationName);

router.post(
  '/organisation-name',
  organisationNameValidationRules(),
  validationErrorHandler,
  organisationNameController.postOrganisationName
);

module.exports = router;