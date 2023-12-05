const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
} = require('./are-they-18/controller');

const { getRegisterAgentAddressURL } = require('./address/_utils/get-register-agent-address-url');
const {
	getRegisterAgentAreThey18URL
} = require('./are-they-18/utils/get-register-agent-are-they-18-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');

const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areThey18ValidationRules
} = require('../../../../validators/register/agent/are-they-18-over');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerAgentAddressURL = getRegisterAgentAddressURL();
const registerAgentAreTheyOver18URL = getRegisterAgentAreThey18URL();

const registerAgentRouter = express.Router({ mergeParams: true });

registerAgentRouter.get(registerAgentAddressURL, registerMiddleware, getRegisterAddressController);
registerAgentRouter.post(
	registerAgentAddressURL,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

registerAgentRouter.get(
	registerAgentAreTheyOver18URL,
	registerMiddleware,
	getRegisterAreThey18Controller
);
registerAgentRouter.post(
	registerAgentAreTheyOver18URL,
	registerMiddleware,
	areThey18ValidationRules(),
	validationErrorHandler,
	postRegisterAreThey18Controller
);

module.exports = { registerAgentRouter };
