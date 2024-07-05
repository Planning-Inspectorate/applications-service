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
	getRegisterOrganisationJobTitleController,
	postRegisterOrganisationJobTitleController
} = require('./job-title/controller');
const {
	getRegisterAddressController,
	postRegisterAddressController
} = require('../_common/address/controller');
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterOrganisationAboutProjectController,
	postRegisterOrganisationAboutProjectController
} = require('./about-project/controller');
const { getRegisterOrganisationCheckAnswersController } = require('./check-answers/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const { getRegisterCompleteController } = require('../_common/complete/controller');

const {
	getRegisterOrganisationNameURL
} = require('./name/_utils/get-register-organisation-name-url');
const {
	getRegisterOrganisationAreYouOver18URL
} = require('./are-you-18/_utils/get-register-organisation-are-you-18-url');
const {
	getRegisterOrganisationOrgNameURL
} = require('./organisation-name/_utils/get-register-organisation-org-name-url');
const {
	getRegisterOrganisationEmailURL
} = require('./email/_utils/get-register-organisation-email-url');
const {
	getRegisterOrganisationJobTitleURL
} = require('./job-title/_utils/get-register-organisation-job-title-url');
const {
	getRegisterOrganisationAddressURL
} = require('./address/_utils/get-register-organisation-address-url');
const {
	getRegisterOrganisationNumberURL
} = require('./number/_utils/get-register-organisation-number-url');
const {
	getRegisterOrganisationAboutProjectURL
} = require('./about-project/_utils/get-register-organisation-about-project-url');
const {
	getRegisterOrganisationCheckAnswersURL
} = require('./check-answers/_utils/get-register-organisation-check-answers-url');
const {
	getRegisterOrganisationDeclarationURL
} = require('./declaration/_utils/get-register-organisation-declaration-url');
const {
	getRegisterOrganisationCompleteURL
} = require('./complete/_utils/get-register-organisation-complete-url');

const { registerMiddleware } = require('../_middleware/register-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../_middleware/i18n/add-common-translations-middleware');
const {
	addRegisterTranslationsMiddleware
} = require('../_middleware/add-register-translations-middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { rules: areYou18ValidationRules } = require('../../../../validators/shared/are-you-18-over');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const {
	rules: jobTitleValidationRules
} = require('../../../../validators/register/organisation/what-job-title-or-role');
const { rules: addressValidationRules } = require('../../../../validators/shared/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/shared/telephone-number');
const {
	rules: organisationOrgNameValidationRules
} = require('../../../../validators/register/organisation/name-of-organisation-or-charity');
const {
	validate: aboutProjectValidationRules
} = require('../../../../validators/register/tell-us-about-project');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerOrganisationNameURL = getRegisterOrganisationNameURL();
const registerOrganisationAreYouOver18URL = getRegisterOrganisationAreYouOver18URL();
const registerOrganisationOrgNameURL = getRegisterOrganisationOrgNameURL();
const registerOrganisationEmailURL = getRegisterOrganisationEmailURL();
const registerOrganisationJobTitleURL = getRegisterOrganisationJobTitleURL();
const registerOrganisationAddressURL = getRegisterOrganisationAddressURL();
const registerOrganisationNumberURL = getRegisterOrganisationNumberURL();
const registerOrganisationAboutProjectURL = getRegisterOrganisationAboutProjectURL();
const registerOrganisationCheckAnswersURL = getRegisterOrganisationCheckAnswersURL();
const registerOrganisationDeclarationURL = getRegisterOrganisationDeclarationURL();
const registerOrganisationCompleteURL = getRegisterOrganisationCompleteURL();

const registerOrganisationRouter = express.Router({ mergeParams: true });

registerOrganisationRouter.get(
	registerOrganisationNameURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterNameController
);
registerOrganisationRouter.post(
	registerOrganisationNameURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	postRegisterNameController
);

registerOrganisationRouter.get(
	registerOrganisationAreYouOver18URL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterAreYou18Controller
);
registerOrganisationRouter.post(
	registerOrganisationAreYouOver18URL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	areYou18ValidationRules(),
	validationErrorHandler,
	postRegisterAreYou18Controller
);

registerOrganisationRouter.get(
	registerOrganisationOrgNameURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterOrganisationOrgNameController
);
registerOrganisationRouter.post(
	registerOrganisationOrgNameURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	organisationOrgNameValidationRules(),
	validationErrorHandler,
	postRegisterOrganisationOrgNameController
);

registerOrganisationRouter.get(
	registerOrganisationEmailURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterEmailController
);
registerOrganisationRouter.post(
	registerOrganisationEmailURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	addCommonTranslationsMiddleware,
	emailValidationRules(),
	validationErrorHandler,
	postRegisterEmailController
);

registerOrganisationRouter.get(
	registerOrganisationJobTitleURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterOrganisationJobTitleController
);
registerOrganisationRouter.post(
	registerOrganisationJobTitleURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	decodeUri('body', ['role']),
	jobTitleValidationRules(),
	validationErrorHandler,
	postRegisterOrganisationJobTitleController
);

registerOrganisationRouter.get(
	registerOrganisationAddressURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterAddressController
);
registerOrganisationRouter.post(
	registerOrganisationAddressURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	addressValidationRules(),
	validationErrorHandler,
	postRegisterAddressController
);

registerOrganisationRouter.get(
	registerOrganisationNumberURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterNumberController
);
registerOrganisationRouter.post(
	registerOrganisationNumberURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	telephoneValidationRules(),
	validationErrorHandler,
	postRegisterNumberController
);

registerOrganisationRouter.get(
	registerOrganisationAboutProjectURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterOrganisationAboutProjectController
);
registerOrganisationRouter.post(
	registerOrganisationAboutProjectURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	decodeUri('body', ['comment']),
	aboutProjectValidationRules(),
	validationErrorHandler,
	postRegisterOrganisationAboutProjectController
);

registerOrganisationRouter.get(
	registerOrganisationCheckAnswersURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterOrganisationCheckAnswersController
);

registerOrganisationRouter.get(
	registerOrganisationDeclarationURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
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
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterCompleteController
);

module.exports = { registerOrganisationRouter };
