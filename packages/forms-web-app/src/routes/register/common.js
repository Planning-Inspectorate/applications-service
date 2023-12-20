const express = require('express');

const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { emailValidationRules } = require('../../validators/shared/email-address');
const emailController = require('../../controllers/register/common/email-address/controller');
const { rules: telephoneValidationRules } = require('../../validators/register/myself/telephone');
const telephoneNumberController = require('../../controllers/register/common/telephone-number/controller');
const registrationCompleteController = require('../../controllers/register/common/registration-complete/controller');
const registrationSavedController = require('../../controllers/register/common/registration-saved/controller');
const declarationController = require('../../controllers/register/common/declaration/controller');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router({ mergeParams: true });

router.get('/email-address', emailController.getEmailAddress);

router.post(
	'/email-address',
	emailValidationRules(),
	validationErrorHandler,
	emailController.postEmailAddress
);

router.get('/telephone-number', telephoneNumberController.getTelephoneNumber);

router.post(
	'/telephone-number',
	telephoneValidationRules(),
	validationErrorHandler,
	telephoneNumberController.postTelephoneNumber
);

router.get('/declaration', declarationController.getDeclaration);

router.post('/declaration', asyncRoute(declarationController.postDeclaration));

router.get('/registration-complete', registrationCompleteController.getConfirmation);

router.get('/registration-saved', registrationSavedController.getRegistrationSaved);

module.exports = router;
