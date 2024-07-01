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
const {
	getRegisterNumberController,
	postRegisterNumberController
} = require('../_common/number/controller');
const {
	getRegisterMyselfAboutProjectController,
	postRegisterMyselfAboutProjectController
} = require('./about-project/controller');
const { getRegisterMyselfCheckAnswersController } = require('./check-answers/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('../_common/declaration/controller');
const { getRegisterCompleteController } = require('../_common/complete/controller');

const { getRegisterMyselfNameURL } = require('./name/_utils/get-register-myself-name-url');
const {
	getRegisterMyselfAreYou18URL
} = require('./are-you-18/_utils/get-register-myself-are-you-18-url');
const { getRegisterMyselfEmailURL } = require('./email/_utils/get-register-myself-email-url');
const { getRegisterMyselfAddressURL } = require('./address/_utils/get-register-myself-address-url');
const { getRegisterMyselfNumberURL } = require('./number/_utils/get-register-myself-number-url');
const {
	getRegisterMyselfAboutProjectURL
} = require('./about-project/_utils/get-register-myself-about-project-url');
const {
	getRegisterMyselfCheckAnswersURL
} = require('./check-answers/_utils/get-register-myself-check-answers-url');
const {
	getRegisterMyselfDeclarationURL
} = require('./declaration/_utils/get-register-myself-declaration-url');
const {
	getRegisterMyselfCompleteURL
} = require('./complete/_utils/get-register-myself-complete-url');

const { registerMiddleware } = require('../_middleware/register-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../_middleware/i18n/add-common-translations-middleware');
const {
	addRegisterTranslationsMiddleware
} = require('../_middleware/add-register-translations-middleware');
const { decodeUri } = require('../../../../middleware/decode-uri');
const {
	addCommonTranslationsMiddleware
} = require('../../../../pages/_middleware/i18n/add-common-translations-middleware');

const { rules: fullNameValidationRules } = require('../../../../validators/shared/full-name');
const { rules: areYou18ValidationRules } = require('../../../../validators/shared/are-you-18-over');
const { emailValidationRules } = require('../../../../validators/shared/email-address');
const { rules: addressValidationRules } = require('../../../../validators/register/myself/address');
const {
	rules: telephoneValidationRules
} = require('../../../../validators/register/myself/telephone');
const {
	validate: aboutProjectValidationRules
} = require('../../../../validators/register/tell-us-about-project');

const { validationErrorHandler } = require('../../../../validators/validation-error-handler');

const registerMyselfNameURL = getRegisterMyselfNameURL();
const registerMyselfAreYou18URL = getRegisterMyselfAreYou18URL();
const registerMyselfEmailURL = getRegisterMyselfEmailURL();
const registerMyselfAddressURL = getRegisterMyselfAddressURL();
const registerMyselfNumberURL = getRegisterMyselfNumberURL();
const registerMyselfDeclarationURL = getRegisterMyselfDeclarationURL();
const registerMyselfCompleteURL = getRegisterMyselfCompleteURL();
const registerMyselfAboutProjectURL = getRegisterMyselfAboutProjectURL();
const registerMyselfCheckAnswersURL = getRegisterMyselfCheckAnswersURL();

const registerMyselfRouter = express.Router({ mergeParams: true });

registerMyselfRouter.get(
	registerMyselfNameURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterNameController
);
registerMyselfRouter.post(
	registerMyselfNameURL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	decodeUri('body', ['full-name']),
	fullNameValidationRules(),
	validationErrorHandler,
	postRegisterNameController
);

registerMyselfRouter.get(
	registerMyselfAreYou18URL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	getRegisterAreYou18Controller
);
registerMyselfRouter.post(
	registerMyselfAreYou18URL,
	addCommonTranslationsMiddleware,
	addRegisterTranslationsMiddleware,
	registerMiddleware,
	areYou18ValidationRules(),
	validationErrorHandler,
	postRegisterAreYou18Controller
);

registerMyselfRouter.get(registerMyselfEmailURL, registerMiddleware, getRegisterEmailController);
registerMyselfRouter.post(
	registerMyselfEmailURL,
	registerMiddleware,
	addCommonTranslationsMiddleware,
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

registerMyselfRouter.get(registerMyselfNumberURL, registerMiddleware, getRegisterNumberController);
registerMyselfRouter.post(
	registerMyselfNumberURL,
	registerMiddleware,
	telephoneValidationRules(),
	validationErrorHandler,
	postRegisterNumberController
);

registerMyselfRouter.get(
	registerMyselfAboutProjectURL,
	registerMiddleware,
	getRegisterMyselfAboutProjectController
);
registerMyselfRouter.post(
	registerMyselfAboutProjectURL,
	registerMiddleware,
	decodeUri('body', ['comment']),
	aboutProjectValidationRules(),
	validationErrorHandler,
	postRegisterMyselfAboutProjectController
);

registerMyselfRouter.get(
	registerMyselfCheckAnswersURL,
	registerMiddleware,
	getRegisterMyselfCheckAnswersController
);

registerMyselfRouter.get(
	registerMyselfDeclarationURL,
	registerMiddleware,
	getRegisterDeclarationController
);
registerMyselfRouter.post(
	registerMyselfDeclarationURL,
	registerMiddleware,
	postRegisterDeclarationController
);

registerMyselfRouter.get(
	registerMyselfCompleteURL,
	registerMiddleware,
	getRegisterCompleteController
);

module.exports = { registerMyselfRouter };
