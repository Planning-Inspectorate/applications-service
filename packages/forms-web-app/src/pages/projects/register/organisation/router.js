const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');

const {
	getRegisterOrganisationAddressURL
} = require('./address/_utils/get-register-organisation-address-url');
const {
	getRegisterOrganisationAreYouOver18URL
} = require('./are-you-18/_utils/get-register-organisation-are-you-18-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/organisation/are-you-18-over');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerOrganisationAddressURL = getRegisterOrganisationAddressURL();
const registerOrganisationAreYouOver18URL = getRegisterOrganisationAreYouOver18URL();

const registerOrganisationRouter = express.Router({ mergeParams: true });

registerOrganisationRouter.get(
	registerOrganisationAddressURL,
	registerMiddleware,
	getRegisterAddressController
);
registerOrganisationRouter.post(
	registerOrganisationAddressURL,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

registerOrganisationRouter.get(
	registerOrganisationAreYouOver18URL,
	registerMiddleware,
	getRegisterAreYou18Controller
);
registerOrganisationRouter.post(
	registerOrganisationAreYouOver18URL,
	registerMiddleware,
	areYou18ValidationRules(),
	validationErrorHandler,
	postRegisterAreYou18Controller
);

module.exports = { registerOrganisationRouter };
