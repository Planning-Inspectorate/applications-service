const express = require('express');

const getUpdatesRouter = express.Router();

const { projectsMiddleware, projectMigrationMiddleware } = require('../_middleware/middleware');
const { getGetUpdatesIndexController } = require('./index/controller');
const {
	getGetUpdatesEmailController,
	postGetUpdatesEmailController
} = require('./email/controller');
const { emailValidationRules } = require('../../../validators/shared/email-address');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
	getGetUpdatesHowOftenController,
	postGetUpdatesHowOftenController
} = require('./how-often/controller');
const { howOftenValidationRules } = require('./how-often/validator');
const { getGetUpdatesConfirmYourEmailController } = require('./confirm-your-email/controller');
const { getGetUpdatesSubscribedController } = require('./subscribed/controller');
const {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
} = require('./unsubscribe/controller');
const { getGetUpdatesUnsubscribedController } = require('./unsubscribed/controller');

const { getUpdatesIndexURL } = require('./index/utils/get-updates-index-url');
const { getUpdatesEmailURL } = require('./email/utils/get-updates-email-url');
const { getUpdatesHowOftenURL } = require('./how-often/utils/get-updates-how-often-url');
const {
	getUpdatesConfirmYourEmailURL
} = require('./confirm-your-email/utils/get-updates-confirm-your-email-url');
const { getUpdatesSubscribedURL } = require('./subscribed/utils/get-updates-subscribed-url');
const { getUpdatesUnsubscribeURL } = require('./unsubscribe/utils/get-updates-unsubscribe-url');
const { getUpdatesUnsubscribedURL } = require('./unsubscribed/utils/get-updates-unsubscribed-url');

const updatesIndexURL = getUpdatesIndexURL();
const updatesEmailURL = getUpdatesEmailURL();
const updatesHowOftenURL = getUpdatesHowOftenURL();
const updatesConfirmYourEmailURL = getUpdatesConfirmYourEmailURL();
const updatesSubscribedURL = getUpdatesSubscribedURL();
const updatesUnsubscribeURL = getUpdatesUnsubscribeURL();
const updatesUnsubscribedURL = getUpdatesUnsubscribedURL();

getUpdatesRouter.get(
	updatesIndexURL,
	[projectsMiddleware, projectMigrationMiddleware],
	getGetUpdatesIndexController
);

getUpdatesRouter.get(updatesEmailURL, getGetUpdatesEmailController);
getUpdatesRouter.post(
	updatesEmailURL,
	emailValidationRules(),
	validationErrorHandler,
	postGetUpdatesEmailController
);

getUpdatesRouter.get(updatesHowOftenURL, getGetUpdatesHowOftenController);
getUpdatesRouter.post(
	updatesHowOftenURL,
	howOftenValidationRules(),
	validationErrorHandler,
	postGetUpdatesHowOftenController
);

getUpdatesRouter.get(
	updatesConfirmYourEmailURL,
	projectsMiddleware,
	getGetUpdatesConfirmYourEmailController
);

getUpdatesRouter.get(updatesSubscribedURL, projectsMiddleware, getGetUpdatesSubscribedController);

getUpdatesRouter.get(updatesUnsubscribeURL, projectsMiddleware, getGetUpdatesUnsubscribeController);
getUpdatesRouter.post(updatesUnsubscribeURL, postGetUpdatesUnsubscribeController);

getUpdatesRouter.get(
	updatesUnsubscribedURL,
	projectsMiddleware,
	getGetUpdatesUnsubscribedController
);

module.exports = { getUpdatesRouter };
