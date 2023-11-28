const express = require('express');

const { getRegisterIndexController } = require('./index/controller');
const {
	getRegisteringForController,
	postRegisteringForController
} = require('./registering-for/controller');

const { getRegisterIndexURL } = require('./index/_utils/get-register-index-url');
const { getRegisteringForURL } = require('./registering-for/_utils/get-registering-for-url');

const { projectsMiddleware } = require('../_middleware/middleware');
const { registerMiddleware } = require('../../../routes/register/middleware');

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

registerRouter.get(registerIndexURL, projectsMiddleware, getRegisterIndexController);
registerRouter.get(`${registerIndexURL}/start`, projectsMiddleware, getRegisterIndexController);

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
