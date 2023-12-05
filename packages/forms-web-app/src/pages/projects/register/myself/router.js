const express = require('express');

const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');

const { getRegisterMyselfAddressURL } = require('./address/_utils/get-register-myself-address-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerMyselfAddressURL = getRegisterMyselfAddressURL();

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

module.exports = { registerMyselfRouter };
