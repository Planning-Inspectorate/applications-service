const express = require('express');

const getUpdatesRouter = express.Router();

const { projectsMiddleware, projectMigrationMiddleware } = require('../_middleware/middleware');
const { getUpdatesRoutes } = require('./_utils/get-updates-url');
const { getGetUpdatesIndex } = require('./index/controller');
const { getGetUpdatesEmail, postGetUpdatesEmail } = require('./email/controller');
const { emailValidationRules } = require('../../../validators/shared/email-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { getGetUpdatesHowOften, postGetUpdatesHowOften } = require('./how-often/controller');
const { howOftenValidationRules } = require('./how-often/validator');
const { getGetUpdatesConfirmYourEmail } = require('./confirm-your-email/controller');
const { getGetUpdatesSubscribed } = require('./subscribed/controller');
const { getGetUpdatesUnsubscribe, postGetUpdatesUnsubscribe } = require('./unsubscribe/controller');
const { getGetUpdatesUnsubscribed } = require('./unsubscribed/controller');
const { getUpdatesIndexURL } = require('./index/utils/get-updates-index-url');

const baseUrl = '/:case_ref/get-updates/';

const getUpdatesIndexRoute = getUpdatesIndexURL();

getUpdatesRouter.get(
	getUpdatesIndexRoute,
	[projectsMiddleware, projectMigrationMiddleware],
	getGetUpdatesIndex
);

getUpdatesRouter.get(`${baseUrl}${getUpdatesRoutes.email}`, getGetUpdatesEmail);
getUpdatesRouter.post(
	`${baseUrl}${getUpdatesRoutes.email}`,
	emailValidationRules(),
	validationErrorHandler,
	postGetUpdatesEmail
);

getUpdatesRouter.get(`${baseUrl}${getUpdatesRoutes.howOften}`, getGetUpdatesHowOften);
getUpdatesRouter.post(
	`${baseUrl}${getUpdatesRoutes.howOften}`,
	howOftenValidationRules(),
	validationErrorHandler,
	postGetUpdatesHowOften
);

getUpdatesRouter.get(
	`${baseUrl}${getUpdatesRoutes.confirm}`,
	projectsMiddleware,
	getGetUpdatesConfirmYourEmail
);

getUpdatesRouter.get(
	`${baseUrl}${getUpdatesRoutes.subscribed}`,
	projectsMiddleware,
	getGetUpdatesSubscribed
);

getUpdatesRouter.get(
	`${baseUrl}${getUpdatesRoutes.unsubscribe}`,
	projectsMiddleware,
	getGetUpdatesUnsubscribe
);
getUpdatesRouter.post(`${baseUrl}${getUpdatesRoutes.unsubscribe}`, postGetUpdatesUnsubscribe);

getUpdatesRouter.get(
	`${baseUrl}${getUpdatesRoutes.unsubscribed}`,
	projectsMiddleware,
	getGetUpdatesUnsubscribed
);

module.exports = { getUpdatesRouter };
