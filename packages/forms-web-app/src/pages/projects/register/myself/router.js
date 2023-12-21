const express = require('express');

const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');
const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');
const {
	getRegisterEmailController,
	postRegisterEmailController
} = require('../_common/email/controller');
const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const { getRegisterMyselfNameURL } = require('./name/_utils/get-register-myself-name-url');
const {
	getRegisterMyselfAreYou18URL
} = require('./are-you-18/_utils/get-register-myself-are-you-18-url');
const { getRegisterMyselfEmailURL } = require('./email/_utils/get-register-myself-email-url');
const { getRegisterMyselfAddressURL } = require('./address/_utils/get-register-myself-address-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/myself/are-you-18-over');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerMyselfNameURL = getRegisterMyselfNameURL();
const registerMyselfAreYou18URL = getRegisterMyselfAreYou18URL();
const registerMyselfEmailURL = getRegisterMyselfEmailURL();
const registerMyselfAddressURL = getRegisterMyselfAddressURL();

const registerMyselfRouter = express.Router({ mergeParams: true });

registerMyselfRouter.get(registerMyselfNameURL, registerMiddleware, getRegisterNameController);
registerMyselfRouter.post(
	registerMyselfNameURL,
	registerMiddleware,
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	postRegisterNameController
);

registerMyselfRouter.get(
	registerMyselfAreYou18URL,
	registerMiddleware,
	getRegisterAreYou18Controller
);
registerMyselfRouter.post(
	registerMyselfAreYou18URL,
	registerMiddleware,
	areYou18ValidationRules(),
	validationErrorHandler,
	postRegisterAreYou18Controller
);

registerMyselfRouter.get(registerMyselfEmailURL, registerMiddleware, getRegisterEmailController);
registerMyselfRouter.post(
	registerMyselfEmailURL,
	registerMiddleware,
	emailValidationRules(),
	validationErrorHandler,
	postRegisterEmailController
);

registerMyselfRouter.get(
	registerMyselfAddressURL,
	registerMiddleware,
	getRegisterAddressController
);
registerMyselfRouter.post(
	registerMyselfAddressURL,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

module.exports = { registerMyselfRouter };
