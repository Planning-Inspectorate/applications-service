import express from 'express';

import { addCommonTranslationsMiddleware } from '../../_middleware/i18n/add-common-translations-middleware.js';

import { projectsMiddleware } from '../_middleware/middleware.js';
import { addGetUpdatesIndexTranslationsMiddleware } from './index/_middleware/add-get-updates-index-translations-middleware.js';

import { getGetUpdatesIndexController } from './index/controller.js';
import { getUpdatesConfirmYourEmailController } from './confirm-your-email/controller.js';
import { getUpdatesSubscribedController } from './subscribed/controller.js';
import {
	getGetUpdatesUnsubscribeController,
	postGetUpdatesUnsubscribeController
} from './unsubscribe/controller.js';
import { getUpdatesUnsubscribedController } from './unsubscribed/controller.js';

import { getUpdatesMiddleware } from './_middleware/get-updates-middleware.js';
/*
// SO all these middlewares do the same thing functionally, the only difference is they load the translations in the _translations folder of their respective folder
// TODO - set up the middleware later
import { addGetUpdatesEmailTranslationsMiddleware } from './email/_middleware/add-get-updates-email-translations-middleware';
import { addGetUpdatesHowOftenTranslationsMiddleware } from './how-often/_middleware/add-get-updates-how-often-translations-middleware';
import { addGetUpdatesConfirmYourEmailTranslationsMiddleware } from './confirm-your-email/_middleware/add-get-updates-confirm-your-email-translations-middleware';
import { addGetUpdatesSubscribedTranslationsMiddleware } from './subscribed/_middleware/add-get-updates-subscribed-translations-middleware';
import { getUpdatesUnsubscribedTranslationsMiddleware } from './unsubscribed/_middleware/unsubscribed-translations-middleware';
import { getUpdatesUnsubscribeTranslationsMiddleware } from './unsubscribe/_middleware/unsubscribe-translations-middleware';

import { selectDocumentQuestionMiddleware } from '../middleware/select-document-middleware.ts';
import { removeIsEditingJourneyMiddleware, someoneElseEditingJourneyMiddleware } from '../middleware/session.ts';
*/

import { createRoutes as getUpdatesFormRoutes } from './form/router.js';

import { getUpdatesIndexURL } from './index/utils/get-updates-index-url.js';
import { getUpdatesFormURL } from './form/utils/get-updates-form-url.js';
import { getUpdatesConfirmYourEmailURL } from './confirm-your-email/utils/get-updates-confirm-your-email-url.js';
import { getUpdatesSubscribedURL } from './subscribed/utils/get-updates-subscribed-url.js';
import { getUpdatesUnsubscribeURL } from './unsubscribe/utils/get-updates-unsubscribe-url.js';
import { getUpdatesUnsubscribedURL } from './unsubscribed/utils/get-updates-unsubscribed-url.js';

const getUpdatesRouter = express.Router();

const updatesIndexURL = getUpdatesIndexURL();
const updatesFormURL = getUpdatesFormURL();
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

getUpdatesRouter.use(updatesFormURL, getUpdatesFormRoutes());

getUpdatesRouter.get(
	updatesConfirmYourEmailURL,
	projectsMiddleware,
	getUpdatesMiddleware,
	getUpdatesConfirmYourEmailController
);

getUpdatesRouter.get(updatesSubscribedURL, projectsMiddleware, getUpdatesSubscribedController);

getUpdatesRouter.get(updatesUnsubscribeURL, projectsMiddleware, getGetUpdatesUnsubscribeController);
getUpdatesRouter.post(updatesUnsubscribeURL, postGetUpdatesUnsubscribeController);

getUpdatesRouter.get(updatesUnsubscribedURL, projectsMiddleware, getUpdatesUnsubscribedController);

export { getUpdatesRouter };
