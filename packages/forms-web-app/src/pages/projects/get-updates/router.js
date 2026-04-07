import express from 'express';

import { addCommonTranslationsMiddleware } from '../../_middleware/i18n/add-common-translations-middleware.js';

import { projectsMiddleware } from '../_middleware/middleware.js';
import { addGetUpdatesIndexTranslationsMiddleware } from './index/_middleware/add-get-updates-index-translations-middleware.js';

import { getGetUpdatesIndexController } from './index/controller.js';

/*
// SO all these middlewares do the same thing functionally, the only difference is they load the translations in the _translations folder of their respective folder
// TODO - set up the middleware later
import { addGetUpdatesEmailTranslationsMiddleware } from './email/_middleware/add-get-updates-email-translations-middleware';
import { addGetUpdatesHowOftenTranslationsMiddleware } from './how-often/_middleware/add-get-updates-how-often-translations-middleware';
import { addGetUpdatesConfirmYourEmailTranslationsMiddleware } from './confirm-your-email/_middleware/add-get-updates-confirm-your-email-translations-middleware';
import { addGetUpdatesSubscribedTranslationsMiddleware } from './subscribed/_middleware/add-get-updates-subscribed-translations-middleware';
import { getUpdatesMiddleware } from './_middleware/get-updates-middleware';
import { getUpdatesUnsubscribedTranslationsMiddleware } from './unsubscribed/_middleware/unsubscribed-translations-middleware';
import { getUpdatesUnsubscribeTranslationsMiddleware } from './unsubscribe/_middleware/unsubscribe-translations-middleware';

import { selectDocumentQuestionMiddleware } from '../middleware/select-document-middleware.ts';
import { removeIsEditingJourneyMiddleware, someoneElseEditingJourneyMiddleware } from '../middleware/session.ts';
*/

import { createRoutes as getUpdatesFormRoutes } from './form/router.js';

import { getUpdatesIndexURL } from './index/utils/get-updates-index-url.js';
import { getUpdatesFormURL } from './form/utils/get-updates-form-url.js';

const getUpdatesRouter = express.Router();

const updatesIndexURL = getUpdatesIndexURL();
const updatesFormURL = getUpdatesFormURL();

getUpdatesRouter.use(addCommonTranslationsMiddleware);

getUpdatesRouter.get(
	updatesIndexURL,
	addGetUpdatesIndexTranslationsMiddleware,
	projectsMiddleware,
	getGetUpdatesIndexController
);

getUpdatesRouter.use(updatesFormURL, getUpdatesFormRoutes());

export { getUpdatesRouter };
