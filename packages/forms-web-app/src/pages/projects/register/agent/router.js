const express = require('express');

const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');
const {
	getRegisterEmailController,
	postRegisterEmailController
} = require('../_common/email/controller');
const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
} = require('./are-they-18/controller');

const { getRegisterAgentNameURL } = require('./name/_utils/get-register-agent-name-url');
const { getRegisterAgentEmailURL } = require('./email/_utils/get-register-agent-email-url');
const { getRegisterAgentAddressURL } = require('./address/_utils/get-register-agent-address-url');
const { getRegisterAgentNumberURL } = require('./number/_utils/get-register-agent-number-url');
const {
	getRegisterAgentDeclarationURL
} = require('./declaration/_utils/get-register-agent-declaration-url');

const {
	getRegisterAgentAreThey18URL
} = require('./are-they-18/utils/get-register-agent-are-they-18-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/register/myself/telephone');
const {
	rules: areThey18ValidationRules
} = require('../../../../validators/register/agent/are-they-18-over');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerAgentNameURL = getRegisterAgentNameURL();
const registerAgentEmailURL = getRegisterAgentEmailURL();
const registerAgentAddressURL = getRegisterAgentAddressURL();
const registerAgentNumberURL = getRegisterAgentNumberURL();
const registerAgentDeclarationURL = getRegisterAgentDeclarationURL();
const registerAgentAreTheyOver18URL = getRegisterAgentAreThey18URL();

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

registerAgentRouter.get(registerAgentEmailURL, registerMiddleware, getRegisterEmailController);
registerAgentRouter.post(
	registerAgentEmailURL,
	registerMiddleware,
	emailValidationRules(),
	validationErrorHandler,
	postRegisterEmailController
);

registerAgentRouter.get(registerAgentAddressURL, registerMiddleware, getRegisterAddressController);
registerAgentRouter.post(
	registerAgentAddressURL,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

registerAgentRouter.get(registerAgentNumberURL, registerMiddleware, getRegisterNumberController);
registerAgentRouter.post(
	registerAgentNumberURL,
	registerMiddleware,
	telephoneValidationRules(),
	validationErrorHandler,
	postRegisterNumberController
);

registerAgentRouter.get(
	registerAgentDeclarationURL,
	registerMiddleware,
	getRegisterDeclarationController
);
registerAgentRouter.post(
	registerAgentDeclarationURL,
	registerMiddleware,
	postRegisterDeclarationController
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
