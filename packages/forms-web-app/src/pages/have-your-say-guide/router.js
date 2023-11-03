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

const { addSteps } = require('./_middleware/add-steps');

const haveYourSayGuideRouter = express.Router();

haveYourSayGuideRouter.get(haveYourSayGuideURL, addSteps, getHaveYourSayGuideController);
/* /index being used for e2e tests */
haveYourSayGuideRouter.get(haveYourSayGuideIndexURL, addSteps, getHaveYourSayGuideController);
haveYourSayGuideRouter.get(takingPartURL, addSteps, getTakingPartController);
haveYourSayGuideRouter.get(registeringURL, addSteps, getRegisteringController);
haveYourSayGuideRouter.get(getInvolvedURL, addSteps, getInvolvedController);
haveYourSayGuideRouter.get(duringExaminationURL, addSteps, getDuringExaminationController);
haveYourSayGuideRouter.get(decisionMadeURL, addSteps, getDecisionMadeController);

module.exports = { haveYourSayGuideRouter };
