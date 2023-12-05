const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const { getRegisterAgentAddressURL } = require('./address/_utils/get-register-agent-address-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerAgentAddressURL = getRegisterAgentAddressURL();

const registerAgentRouter = express.Router({ mergeParams: true });

registerAgentRouter.get(registerAgentAddressURL, registerMiddleware, getRegisterAddressController);
registerAgentRouter.post(
	registerAgentAddressURL,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

module.exports = { registerAgentRouter };
