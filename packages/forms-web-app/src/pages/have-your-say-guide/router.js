const express = require('express');

const { getHaveYourSayGuideController } = require('./index/controller');
const { getTakingPartController } = require('./taking-part/controller');
const { getRegisteringController } = require('./registering/controller');
const { getInvolvedController } = require('./get-involved/controller');
const { getDuringExaminationController } = require('./during-examination/controller');
const { getDecisionMadeController } = require('./decision-made/controller');

const { haveYourSayGuideURL, haveYourSayGuideIndexURL } = require('./index/config');
const { takingPartURL } = require('./taking-part/config');
const { registeringURL } = require('./registering/config');
const { getInvolvedURL } = require('./get-involved/config');
const { duringExaminationURL } = require('./during-examination/config');
const { decisionMadeURL } = require('./decision-made/config');

const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	addHaveYourSayGuideTranslationsMiddleware
} = require('./_middleware/add-have-your-say-guide-translations-middleware');
const {
	addHaveYourSayGuideStepsMiddleware
} = require('./_middleware/add-have-your-say-guide-steps-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');

const haveYourSayGuideRouter = express.Router();

haveYourSayGuideRouter.use(
	addCommonTranslationsMiddleware,
	addHaveYourSayGuideTranslationsMiddleware
);
haveYourSayGuideRouter.get(
	haveYourSayGuideURL,
	addIndexTranslationsMiddleware,
	addHaveYourSayGuideStepsMiddleware,
	getHaveYourSayGuideController
);
/* /index being used for e2e tests */
haveYourSayGuideRouter.get(
	haveYourSayGuideIndexURL,
	addIndexTranslationsMiddleware,
	addHaveYourSayGuideStepsMiddleware,
	getHaveYourSayGuideController
);
haveYourSayGuideRouter.get(
	takingPartURL,
	addHaveYourSayGuideStepsMiddleware,
	getTakingPartController
);
haveYourSayGuideRouter.get(
	registeringURL,
	addHaveYourSayGuideStepsMiddleware,
	getRegisteringController
);
haveYourSayGuideRouter.get(
	getInvolvedURL,
	addHaveYourSayGuideStepsMiddleware,
	getInvolvedController
);
haveYourSayGuideRouter.get(
	duringExaminationURL,
	addHaveYourSayGuideStepsMiddleware,
	getDuringExaminationController
);
haveYourSayGuideRouter.get(
	decisionMadeURL,
	addHaveYourSayGuideStepsMiddleware,
	getDecisionMadeController
);

module.exports = { haveYourSayGuideRouter };
