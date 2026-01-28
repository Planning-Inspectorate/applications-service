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
const { registerStartRedirectMiddleware } = require('../_middleware/start-redirect-middleware');
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

registerAgentRouter.get(
	registerAgentNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterNameController
);
registerAgentRouter.post(
	registerAgentNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	postRegisterNameController
);

registerAgentRouter.get(
	registerAgentOrgNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentOrgNameController
);
registerAgentRouter.post(
	registerAgentOrgNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	organisationNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentOrgNameController
);

registerAgentRouter.get(
	registerAgentEmailURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterEmailController
);
registerAgentRouter.post(
	registerAgentEmailURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	emailValidationRules(),
	validationErrorHandler,
	postRegisterEmailController
);

registerAgentRouter.get(
	registerAgentAddressURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAddressController
);
registerAgentRouter.post(
	registerAgentAddressURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

registerAgentRouter.get(
	registerAgentRepresentingWhoURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentRepresentingWhoController
);
registerAgentRouter.post(
	registerAgentRepresentingWhoURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	representingWhoValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingWhoController
);

registerAgentRouter.get(
	registerAgentRepresentingPersonNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentRepresentingNameController
);
registerAgentRouter.post(
	registerAgentRepresentingPersonNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	representingNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingNameController
);

registerAgentRouter.get(
	registerAgentRepresentingOrgNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentRepresentingNameController
);
registerAgentRouter.post(
	registerAgentRepresentingOrgNameURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	representingNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingNameController
);

registerAgentRouter.get(
	registerAgentRepresentingHouseholdURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentRepresentingNameController
);
registerAgentRouter.post(
	registerAgentRepresentingHouseholdURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	representingNameValidationRules(),
	validationErrorHandler,
	postRegisterAgentRepresentingNameController
);

registerAgentRouter.get(
	registerAgentNumberURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterNumberController
);
registerAgentRouter.post(
	registerAgentNumberURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	telephoneValidationRules(),
	validationErrorHandler,
	postRegisterNumberController
);

registerAgentRouter.get(
	registerAgentAreTheyOver18URL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAreThey18Controller
);
registerAgentRouter.post(
	registerAgentAreTheyOver18URL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	areThey18ValidationRules(),
	validationErrorHandler,
	postRegisterAreThey18Controller
);

registerAgentRouter.get(
	registerAgentTheirAddressURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentTheirAddressController
);
registerAgentRouter.post(
	registerAgentTheirAddressURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAgentTheirAddressController
);

registerAgentRouter.get(
	registerAgentTheirEmailURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentTheirEmailController
);
registerAgentRouter.post(
	registerAgentTheirEmailURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	theirEmailValidationRules(),
	validationErrorHandler,
	postRegisterAgentTheirEmailController
);

registerAgentRouter.get(
	registerAgentAboutProjectURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentAboutProjectController
);
registerAgentRouter.post(
	registerAgentAboutProjectURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	decodeUri('body', ['comment']),
	aboutProjectValidationRules(),
	validationErrorHandler,
	postRegisterAgentAboutProjectController
);

registerAgentRouter.get(
	registerAgentTheirTelephoneURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentTheirTelephoneController
);
registerAgentRouter.post(
	registerAgentTheirTelephoneURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	theirTelephoneValidationRules(),
	validationErrorHandler,
	postRegisterAgentTheirTelephoneController
);

registerAgentRouter.get(
	registerAgentCheckAnswersURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAgentCheckAnswersController
);

registerAgentRouter.get(
	registerAgentDeclarationURL,
	registerStartRedirectMiddleware,
	noCache,
	registerMiddleware,
	getRegisterDeclarationController
);
registerAgentRouter.post(
	registerAgentDeclarationURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	postRegisterDeclarationController
);

registerAgentRouter.get(
	registerAgentCompleteURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterCompleteController
);

registerAgentRouter.get(
	registerAgentAlreadyRegisteredURL,
	registerStartRedirectMiddleware,
	registerMiddleware,
	getRegisterAlreadyRegisteredController
);

module.exports = { registerAgentRouter };
