const express = require('express');

const {
	getRegisterNameController,
	postRegisterNameController
} = require('../_common/name/controller');
const {
	getRegisterAgentOrgNameController,
	postRegisterAgentOrgNameController
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
	getRegisterAgentRepresentingWhoController,
	postRegisterAgentRepresentingWhoController
} = require('./representing-who/controller');
const {
	getRegisterAgentRepresentingNameController,
	postRegisterAgentRepresentingNameController
} = require('./_common/representing-name/controller');
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterAreThey18Controller,
	postRegisterAreThey18Controller
} = require('./are-they-18/controller');
const {
	getRegisterAgentTheirAddressController,
	postRegisterAgentTheirAddressController
} = require('./their-address/controller');
const {
	getRegisterAgentTheirEmailController,
	postRegisterAgentTheirEmailController
} = require('./their-email/controller');
const {
	getRegisterAgentAboutProjectController,
	postRegisterAgentAboutProjectController
} = require('./about-project/controller');
const {
	getRegisterAgentTheirTelephoneController,
	postRegisterAgentTheirTelephoneController
} = require('./their-telephone/controller');
const { getRegisterAgentCheckAnswersController } = require('./check-answers/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const { getRegisterCompleteController } = require('../_common/complete/controller');
const {
	getRegisterAlreadyRegisteredController
} = require('../_common/already-registered/controller');

const { getRegisterAgentNameURL } = require('./name/_utils/get-register-agent-name-url');
const {
	getRegisterAgentOrgNameURL
} = require('./organisation-name/_utils/get-register-agent-organisation-name-url');
const { getRegisterAgentEmailURL } = require('./email/_utils/get-register-agent-email-url');
const { getRegisterAgentAddressURL } = require('./address/_utils/get-register-agent-address-url');
const {
	getRegisterAgentRepresentingWhoURL
} = require('./representing-who/_utils/get-register-agent-representing-who-url');
const {
	getRegisterAgentRepresentingPersonNameURL
} = require('./representing-person-name/_utils/get-register-agent-representing-person-name-url');
const {
	getRegisterAgentRepresentingOrgNameURL
} = require('./representing-organisation-name/_utils/get-register-agent-representing-organisation-name-url');
const {
	getRegisterAgentRepresentingHouseholdURL
} = require('./representing-household-name/_utils/get-register-agent-representing-household-url');
const { getRegisterAgentNumberURL } = require('./number/_utils/get-register-agent-number-url');
const {
	getRegisterAgentAreThey18URL
} = require('./are-they-18/utils/get-register-agent-are-they-18-url');
const {
	getRegisterAgentTheirAddressURL
} = require('./their-address/_utils/get-register-agent-their-address-url');
const {
	getRegisterAgentTheirEmailURL
} = require('./their-email/_utils/get-register-agent-their-email-url');
const {
	getRegisterAgentAboutProjectURL
} = require('./about-project/_utils/get-register-agent-about-project-url');
const {
	getRegisterAgentTheirTelephoneURL
} = require('./their-telephone/_utils/get-register-agent-their-telephone-url');
const {
	getRegisterAgentCheckAnswersURL
} = require('./check-answers/_utils/get-register-agent-check-answers-url');
const {
	getRegisterAgentDeclarationURL
} = require('./declaration/_utils/get-register-agent-declaration-url');
const {
	getRegisterAgentCompleteURL
} = require('./complete/_utils/get-register-agent-complete-url');
const {
	getRegisterAgentAlreadyRegisteredURL
} = require('./already-registered/_utils/get-register-agent-already-registered-url');

const { registerMiddleware } = require('../_middleware/register-middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');
const { noCache } = require('../_middleware/no-cache');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const {
	rules: organisationNameValidationRules
} = require('../../../../validators/register/agent/name-of-organisation');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/shared/address');
const {
	rules: representingWhoValidationRules
} = require('../../../../validators/register/agent/who-representing');
const {
	rules: representingNameValidationRules
} = require('../../../../validators/register/agent/name-representing');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/shared/telephone-number');
const {
	rules: areThey18ValidationRules
} = require('../../../../validators/register/agent/are-they-18-over');
const {
	rules: theirEmailValidationRules
} = require('../../../../validators/register/agent/their-email-address');
const {
	validate: aboutProjectValidationRules
} = require('../../../../validators/register/tell-us-about-project');
const {
	rules: theirTelephoneValidationRules
} = require('../../../../validators/register/agent/their-telephone-number');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerAgentNameURL = getRegisterAgentNameURL();
const registerAgentOrgNameURL = getRegisterAgentOrgNameURL();
const registerAgentEmailURL = getRegisterAgentEmailURL();
const registerAgentAddressURL = getRegisterAgentAddressURL();
const registerAgentRepresentingWhoURL = getRegisterAgentRepresentingWhoURL();
const registerAgentRepresentingPersonNameURL = getRegisterAgentRepresentingPersonNameURL();
const registerAgentRepresentingOrgNameURL = getRegisterAgentRepresentingOrgNameURL();
const registerAgentRepresentingHouseholdURL = getRegisterAgentRepresentingHouseholdURL();
const registerAgentNumberURL = getRegisterAgentNumberURL();
const registerAgentAreTheyOver18URL = getRegisterAgentAreThey18URL();
const registerAgentTheirAddressURL = getRegisterAgentTheirAddressURL();
const registerAgentTheirEmailURL = getRegisterAgentTheirEmailURL();
const registerAgentAboutProjectURL = getRegisterAgentAboutProjectURL();
const registerAgentTheirTelephoneURL = getRegisterAgentTheirTelephoneURL();
const registerAgentCheckAnswersURL = getRegisterAgentCheckAnswersURL();
const registerAgentDeclarationURL = getRegisterAgentDeclarationURL();
const registerAgentCompleteURL = getRegisterAgentCompleteURL();
const registerAgentAlreadyRegisteredURL = getRegisterAgentAlreadyRegisteredURL();

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

registerAgentRouter.get(
	registerAgentOrgNameURL,
	registerMiddleware,
	getRegisterAgentOrgNameController
);
registerAgentRouter.post(
	registerAgentOrgNameURL,
	registerMiddleware,
	organisationNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentOrgNameController
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

registerAgentRouter.get(
	registerAgentRepresentingWhoURL,
	registerMiddleware,
	getRegisterAgentRepresentingWhoController
);
registerAgentRouter.post(
	registerAgentRepresentingWhoURL,
	registerMiddleware,
	representingWhoValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingWhoController
);

registerAgentRouter.get(
	registerAgentRepresentingPersonNameURL,
	registerMiddleware,
	getRegisterAgentRepresentingNameController
);
registerAgentRouter.post(
	registerAgentRepresentingPersonNameURL,
	registerMiddleware,
	representingNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingNameController
);

registerAgentRouter.get(
	registerAgentRepresentingOrgNameURL,
	registerMiddleware,
	getRegisterAgentRepresentingNameController
);
registerAgentRouter.post(
	registerAgentRepresentingOrgNameURL,
	registerMiddleware,
	representingNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingNameController
);

registerAgentRouter.get(
	registerAgentRepresentingHouseholdURL,
	registerMiddleware,
	getRegisterAgentRepresentingNameController
);
registerAgentRouter.post(
	registerAgentRepresentingHouseholdURL,
	registerMiddleware,
	representingNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingNameController
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

registerAgentRouter.get(
	registerAgentTheirAddressURL,
	registerMiddleware,
	getRegisterAgentTheirAddressController
);
registerAgentRouter.post(
	registerAgentTheirAddressURL,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAgentTheirAddressController
);

registerAgentRouter.get(
	registerAgentTheirEmailURL,
	registerMiddleware,
	getRegisterAgentTheirEmailController
);
registerAgentRouter.post(
	registerAgentTheirEmailURL,
	registerMiddleware,
	theirEmailValidationRules(),
	validationErrorHandler,
	postRegisterAgentTheirEmailController
);

registerAgentRouter.get(
	registerAgentAboutProjectURL,
	registerMiddleware,
	getRegisterAgentAboutProjectController
);
registerAgentRouter.post(
	registerAgentAboutProjectURL,
	registerMiddleware,
	decodeUri('body', ['comment']),
	aboutProjectValidationRules(),
	validationErrorHandler,
	postRegisterAgentAboutProjectController
);

registerAgentRouter.get(
	registerAgentTheirTelephoneURL,
	registerMiddleware,
	getRegisterAgentTheirTelephoneController
);
registerAgentRouter.post(
	registerAgentTheirTelephoneURL,
	registerMiddleware,
	theirTelephoneValidationRules(),
	validationErrorHandler,
	postRegisterAgentTheirTelephoneController
);

registerAgentRouter.get(
	registerAgentCheckAnswersURL,
	registerMiddleware,
	getRegisterAgentCheckAnswersController
);

registerAgentRouter.get(
	registerAgentDeclarationURL,
	noCache,
	registerMiddleware,
	getRegisterDeclarationController
);
registerAgentRouter.post(
	registerAgentDeclarationURL,
	registerMiddleware,
	postRegisterDeclarationController
);

registerAgentRouter.get(
	registerAgentCompleteURL,
	registerMiddleware,
	getRegisterCompleteController
);

registerAgentRouter.get(
	registerAgentAlreadyRegisteredURL,
	registerMiddleware,
	getRegisterAlreadyRegisteredController
);

module.exports = { registerAgentRouter };
