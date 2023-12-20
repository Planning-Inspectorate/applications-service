const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
} = require('./are-they-18/controller');
const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');

const { getRegisterAgentAddressURL } = require('./address/_utils/get-register-agent-address-url');
const {
	getRegisterAgentAreThey18URL
} = require('./are-they-18/utils/get-register-agent-are-they-18-url');
const { getRegisterAgentNameURL } = require('./name/_utils/get-register-agent-name-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areThey18ValidationRules
} = require('../../../../validators/register/agent/are-they-18-over');
const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { decodeUri } = require('../../../../middleware/decode-uri');

const registerAgentAddressURL = getRegisterAgentAddressURL();
const registerAgentAreTheyOver18URL = getRegisterAgentAreThey18URL();
const registerAgentNameURL = getRegisterAgentNameURL();

const registerAgentRouter = express.Router({ mergeParams: true });

registerAgentRouter.get(registerAgentNameURL, registerMiddleware, getRegisterNameController);
registerAgentRouter.post(
	registerAgentNameURL,
	registerMiddleware,
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	postRegisterNameController
);

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
