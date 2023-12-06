const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterAreYou18Controller,
	postRegisterAreYou18Controller
} = require('../_common/are-you-18/controller');

const { getRegisterMyselfAddressURL } = require('./address/_utils/get-register-myself-address-url');
const {
	getRegisterMyselfAreYou18URL
} = require('./are-you-18/_utils/get-register-myself-are-you-18-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');

const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/myself/are-you-18-over');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerMyselfAddressURL = getRegisterMyselfAddressURL();
const registerMyselfAreYou18URL = getRegisterMyselfAreYou18URL();

const registerMyselfRouter = express.Router({ mergeParams: true });

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

module.exports = { registerMyselfRouter };
