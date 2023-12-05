const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const {
	getRegisterOrganisationAddressURL
} = require('./address/_utils/get-register-organisation-address-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerOrganisationAddressURL = getRegisterOrganisationAddressURL();

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

module.exports = { registerOrganisationRouter };
