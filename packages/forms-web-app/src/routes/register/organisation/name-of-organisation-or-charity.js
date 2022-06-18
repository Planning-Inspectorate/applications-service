const express = require('express');

const organisationNameController = require('../../../controllers/register/organisation/name-of-organisation-or-charity');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	rules: organisationNameValidationRules
} = require('../../../validators/register/organisation/name-of-organisation-or-charity');

const router = express.Router();

router.get('/name-of-organisation-or-charity', organisationNameController.getOrganisationName);

router.post(
	'/name-of-organisation-or-charity',
	organisationNameValidationRules(),
	validationErrorHandler,
	organisationNameController.postOrganisationName
);

module.exports = router;
