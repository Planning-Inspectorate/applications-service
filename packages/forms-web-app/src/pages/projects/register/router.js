const express = require('express');

const { getRegisterIndexController } = require('./index/controller');
const {
	getRegisteringForController,
	postRegisteringForController
} = require('./registering-for/controller');

const { getRegisterIndexURL } = require('./index/_utils/get-register-index-url');
const { getRegisteringForURL } = require('./registering-for/_utils/get-registering-for-url');

const { projectsMiddleware } = require('../_middleware/middleware');
const { registerMiddleware } = require('./_middleware/register-middleware');
const {
	addRegisterTranslationsMiddleware
} = require('./_middleware/add-register-translations-middleware');

const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	validateRegisteringForOptions
} = require('./registering-for/_validators/validate-registering-for-options');

const { registerAgentRouter } = require('./agent/router');
const { registerMyselfRouter } = require('./myself/router');
const { registerOrganisationRouter } = require('./organisation/router');

const registerIndexURL = getRegisterIndexURL();
const registeringForURL = getRegisteringForURL();

const registerRouter = express.Router({ mergeParams: true });

registerRouter.get(
	registerIndexURL,
	addRegisterTranslationsMiddleware,
	projectsMiddleware,
	getRegisterIndexController
);
registerRouter.get(
	`${registerIndexURL}/start`,
	addRegisterTranslationsMiddleware,
	projectsMiddleware,
	getRegisterIndexController
);

registerRouter.get(registeringForURL, registerMiddleware, getRegisteringForController);
registerRouter.post(
	registeringForURL,
	registerMiddleware,
	validateRegisteringForOptions(),
	validationErrorHandler,
	postRegisteringForController
);

registerRouter.use(registerAgentRouter);

registerRouter.use(registerMyselfRouter);

registerRouter.use(registerOrganisationRouter);

module.exports = { registerRouter };
