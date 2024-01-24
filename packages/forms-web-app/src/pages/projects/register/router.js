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
const { registerRoute } = require('./config');

registerRouter.use((req, res, next) => {
	const namespace = registerRoute 
	const currentLang = req.i18n.language

	req.i18n.loadNamespaces(namespace, (err) => {
	  if (err) {
		console.error(`Failed to load namespace: ${namespace}`, err);
		res.status(500).send(`Failed to load namespace for lang: ${currentLang}`);
	  } else {
		console.log(`Loaded namespace: ${namespace} for lang: ${currentLang}`)
		next();
	  }
	});
  });

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
