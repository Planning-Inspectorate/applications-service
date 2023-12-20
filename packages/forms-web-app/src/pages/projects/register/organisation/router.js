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
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');

const {
	getRegisterOrganisationAddressURL
} = require('./address/_utils/get-register-organisation-address-url');
const {
	getRegisterOrganisationAreYouOver18URL
} = require('./are-you-18/_utils/get-register-organisation-are-you-18-url');
const {
	getRegisterOrganisationNameURL
} = require('./name/_utils/get-register-organisation-name-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/organisation/are-you-18-over');
const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { decodeUri } = require('../../../../middleware/decode-uri');

const registerOrganisationAddressURL = getRegisterOrganisationAddressURL();
const registerOrganisationAreYouOver18URL = getRegisterOrganisationAreYouOver18URL();
const registerOrganisationNameURL = getRegisterOrganisationNameURL();

const registerOrganisationRouter = express.Router({ mergeParams: true });

registerOrganisationRouter.get(
	registerOrganisationNameURL,
	registerMiddleware,
	getRegisterNameController
);
registerOrganisationRouter.post(
	registerOrganisationNameURL,
	registerMiddleware,
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	postRegisterNameController
);

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
