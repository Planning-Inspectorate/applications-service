const express = require('express');

const getUpdatesRouter = express.Router();

const {
	addCommonTranslationsMiddleware
} = require('../../_middleware/i18n/add-common-translations-middleware');
const {
	addGetUpdatesIndexTranslationsMiddleware
} = require('./index/_middleware/add-get-updates-index-translations-middleware');
const {
	addGetUpdatesEmailTranslationsMiddleware
} = require('./email/_middleware/add-get-updates-email-translations-middleware');
const {
	addGetUpdatesHowOftenTranslationsMiddleware
} = require('./how-often/_middleware/add-get-updates-how-often-translations-middleware');
const {
	addGetUpdatesConfirmYourEmailTranslationsMiddleware
} = require('./confirm-your-email/_middleware/add-get-updates-confirm-your-email-translations-middleware');
const {
	addGetUpdatesSubscribedTranslationsMiddleware
} = require('./subscribed/_middleware/add-get-updates-subscribed-translations-middleware');
const { projectsMiddleware } = require('../_middleware/middleware');
const { getUpdatesMiddleware } = require('./_middleware/get-updates-middleware');
const {
	getUpdatesUnsubscribeTranslationsMiddleware
} = require('./unsubscribe/_middleware/unsubscribe-translations-middleware');

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
const { getUpdatesConfirmYourEmailController } = require('./confirm-your-email/controller');
const { getUpdatesSubscribedController } = require('./subscribed/controller');
const {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
} = require('./unsubscribe/controller');
const { getUpdatesUnsubscribedController } = require('./unsubscribed/controller');

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

getUpdatesRouter.use(addCommonTranslationsMiddleware);

getUpdatesRouter.get(
	updatesIndexURL,
	addGetUpdatesIndexTranslationsMiddleware,
	projectsMiddleware,
	getGetUpdatesIndexController
);

getUpdatesRouter.get(
	updatesEmailURL,
	addGetUpdatesEmailTranslationsMiddleware,
	getUpdatesMiddleware,
	getGetUpdatesEmailController
);
getUpdatesRouter.post(
	updatesEmailURL,
	emailValidationRules(),
	validationErrorHandler,
	postGetUpdatesEmailController
);

getUpdatesRouter.get(
	updatesHowOftenURL,
	addGetUpdatesHowOftenTranslationsMiddleware,
	getUpdatesMiddleware,
	getGetUpdatesHowOftenController
);
getUpdatesRouter.post(
	updatesHowOftenURL,
	howOftenValidationRules(),
	validationErrorHandler,
	postGetUpdatesHowOftenController
);

getUpdatesRouter.get(
	updatesConfirmYourEmailURL,
	addGetUpdatesConfirmYourEmailTranslationsMiddleware,
	projectsMiddleware,
	getUpdatesMiddleware,
	getUpdatesConfirmYourEmailController
);

getUpdatesRouter.get(
	updatesSubscribedURL,
	addGetUpdatesSubscribedTranslationsMiddleware,
	projectsMiddleware,
	getUpdatesSubscribedController
);

getUpdatesRouter.get(
	updatesUnsubscribeURL,
	projectsMiddleware,
	getUpdatesUnsubscribeTranslationsMiddleware,
	getGetUpdatesUnsubscribeController
);
getUpdatesRouter.post(updatesUnsubscribeURL, postGetUpdatesUnsubscribeController);

getUpdatesRouter.get(updatesUnsubscribedURL, projectsMiddleware, getUpdatesUnsubscribedController);

module.exports = { getUpdatesRouter };
