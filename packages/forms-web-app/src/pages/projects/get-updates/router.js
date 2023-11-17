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
const { getUpdatesEmailURL } = require('./email/utils/get-updates-email-url');
const { getUpdatesHowOftenURL } = require('./how-often/utils/get-updates-how-often-url');

const getUpdatesIndexRoute = getUpdatesIndexURL();
const getUpdatesEmailRoute = getUpdatesEmailURL();
const getUpdatesHowOftenRoute = getUpdatesHowOftenURL();

const baseUrl = '/:case_ref/get-updates/';

getUpdatesRouter.get(
	getUpdatesIndexRoute,
	[projectsMiddleware, projectMigrationMiddleware],
	getGetUpdatesIndex
);

getUpdatesRouter.get(getUpdatesEmailRoute, getGetUpdatesEmail);
getUpdatesRouter.post(
	getUpdatesEmailRoute,
	emailValidationRules(),
	validationErrorHandler,
	postGetUpdatesEmail
);

getUpdatesRouter.get(getUpdatesHowOftenRoute, getGetUpdatesHowOften);
getUpdatesRouter.post(
	getUpdatesHowOftenRoute,
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
