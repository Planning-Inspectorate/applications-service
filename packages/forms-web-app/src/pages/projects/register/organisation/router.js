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
	getRegisterOrganisationOrgNameController,
	postRegisterOrganisationOrgNameController
} = require('./organisation-name/controller');
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
const { getRegisterCompleteController } = require('../_common/complete/controller');

const {
	getRegisterOrganisationAreYouOver18URL
} = require('./are-you-18/_utils/get-register-organisation-are-you-18-url');
const {
	getRegisterOrganisationOrgNameURL
} = require('./organisation-name/_utils/get-register-organisation-org-name-url');
const {
	getRegisterOrganisationNameURL
} = require('./name/_utils/get-register-organisation-name-url');
const {
	getRegisterOrganisationEmailURL
} = require('./email/_utils/get-register-organisation-email-url');
const {
	getRegisterOrganisationAddressURL
} = require('./address/_utils/get-register-organisation-address-url');
const {
	getRegisterOrganisationNumberURL
} = require('./number/_utils/get-register-organisation-number-url');
const {
	getRegisterOrganisationDeclarationURL
} = require('./declaration/_utils/get-register-organisation-declaration-url');
const {
	getRegisterOrganisationCompleteURL
} = require('./complete/_utils/get-register-organisation-complete-url');

const { registerMiddleware } = require('../../../../routes/register/middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const {
	rules: areYou18ValidationRules
} = require('../../../../validators/register/organisation/are-you-18-over');
const {
	rules: organisationNameValidationRules
} = require('../../../../validators/register/organisation/name-of-organisation-or-charity');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/register/myself/telephone');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerOrganisationNameURL = getRegisterOrganisationNameURL();
const registerOrganisationAreYouOver18URL = getRegisterOrganisationAreYouOver18URL();
const registerOrganisationOrgNameURL = getRegisterOrganisationOrgNameURL();
const registerOrganisationEmailURL = getRegisterOrganisationEmailURL();
const registerOrganisationAddressURL = getRegisterOrganisationAddressURL();
const registerOrganisationNumberURL = getRegisterOrganisationNumberURL();
const registerOrganisationDeclarationURL = getRegisterOrganisationDeclarationURL();
const registerOrganisationCompleteURL = getRegisterOrganisationCompleteURL();

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

registerOrganisationRouter.get(
	registerOrganisationOrgNameURL,
	registerMiddleware,
	getRegisterOrganisationOrgNameController
);
registerOrganisationRouter.post(
	registerOrganisationOrgNameURL,
	registerMiddleware,
	organisationNameValidationRules(),
	validationErrorHandler,
	postRegisterOrganisationOrgNameController
);

registerOrganisationRouter.get(
	registerOrganisationEmailURL,
	registerMiddleware,
	getRegisterEmailController
);
registerOrganisationRouter.post(
	registerOrganisationEmailURL,
	registerMiddleware,
	emailValidationRules(),
	validationErrorHandler,
	postRegisterEmailController
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
	registerOrganisationNumberURL,
	registerMiddleware,
	getRegisterNumberController
);
registerOrganisationRouter.post(
	registerOrganisationNumberURL,
	registerMiddleware,
	telephoneValidationRules(),
	validationErrorHandler,
	postRegisterNumberController
);

registerOrganisationRouter.get(
	registerOrganisationDeclarationURL,
	registerMiddleware,
	getRegisterDeclarationController
);
registerOrganisationRouter.post(
	registerOrganisationDeclarationURL,
	registerMiddleware,
	postRegisterDeclarationController
);

registerOrganisationRouter.get(
	registerOrganisationCompleteURL,
	registerMiddleware,
	getRegisterCompleteController
);

module.exports = { registerOrganisationRouter };
