const express = require('express');

/** controllers */
const { getRegisterIndexController } = require('./index/controller');
const {
	getRegisterDeclarationController,
	postRegisterDeclarationController
} = require('./_common/declaration/controller');
const { getRegisterCompleteController } = require('./_common/complete/controller');
const {
	getRegisterAlreadyRegisteredController
} = require('./_common/already-registered/controller');

/** routes and urls */
const { createRoutes: registerFormRoutes } = require('./forms/router');

const { getRegisterIndexURL } = require('./index/_utils/get-register-index-url');
const { getRegisterFormURL } = require('./forms/_utils/get-form-url');
const {
	getRegisterDeclarationURL
} = require('./_common/declaration/_utils/get-register-declaration-url');
const { getRegisterCompleteURL } = require('./_common/complete/_utils/get-register-complete-url');
const {
	getRegisterAlreadySubmittedURL
} = require('./_common/already-registered/_utils/get-register-already-submitted-url');

/** middleware */
const { projectsMiddleware } = require('../_middleware/middleware');
//const { registerMiddleware } = require('./_middleware/register-middleware');
//const { registerStartRedirectMiddleware } = require('./_middleware/start-redirect-middleware');
const {
	addRegisterTranslationsMiddleware
} = require('./_middleware/add-register-translations-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../pages/_middleware/i18n/add-common-translations-middleware');

//const { validationErrorHandler } = require('../../../validators/validation-error-handler');
/*
const {
	validateRegisteringForOptions
} = require('./registering-for/_validators/validate-registering-for-options');
 */

const registerIndexURL = getRegisterIndexURL();
const registerFormURL = getRegisterFormURL();
const registerDeclarationURL = getRegisterDeclarationURL();
const registerCompleteURL = getRegisterCompleteURL();
const registerAlreadyRegisteredURL = getRegisterAlreadySubmittedURL();

const registerRouter = express.Router({ mergeParams: true });

registerRouter.use(addCommonTranslationsMiddleware, addRegisterTranslationsMiddleware);

registerRouter.get(registerIndexURL, projectsMiddleware, getRegisterIndexController);
registerRouter.get(`${registerIndexURL}/start`, projectsMiddleware, getRegisterIndexController);

registerRouter.use(registerFormURL, registerFormRoutes());

registerRouter.get(registerDeclarationURL, getRegisterDeclarationController);
registerRouter.post(registerDeclarationURL, postRegisterDeclarationController);

registerRouter.get(registerCompleteURL, getRegisterCompleteController);

registerRouter.get(registerAlreadyRegisteredURL, getRegisterAlreadyRegisteredController);

module.exports = { registerRouter };
