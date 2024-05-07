const express = require('express');

const { getProcessGuideController } = require('./index/controller');
const { getPreApplicationController } = require('./pre-application/controller');
const { getAcceptanceController } = require('./acceptance/controller');
const { getPreExaminationController } = require('./pre-examination/controller');
const { getExaminationController } = require('./examination/controller');
const { getRecommendationController } = require('./recommendation/controller');
const { getDecisionController } = require('./decision/controller');
const { getPostDecisionController } = require('./post-decision/controller');

const { processGuideURL } = require('./index/config');
const { preApplicationURL } = require('./pre-application/config');
const { acceptanceURL } = require('./acceptance/config');
const { preExaminationURL } = require('./pre-examination/config');
const { examinationURL } = require('./examination/config');
const { recommendationURL } = require('./recommendation/config');
const { decisionURL } = require('./decision/config');
const { postDecisionURL } = require('./post-decision/config');

const { addSteps } = require('./_middleware/add-steps');
const {
	addProcessGuideTranslationsMiddleware
} = require('./_middleware/add-process-guide-translations-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../../../src/pages/_middleware/i18n/add-common-translations-middleware');

const processGuideRouter = express.Router();

processGuideRouter.use(addCommonTranslationsMiddleware, addProcessGuideTranslationsMiddleware);

processGuideRouter.get(processGuideURL, addSteps, getProcessGuideController);
processGuideRouter.get(preApplicationURL, addSteps, getPreApplicationController);
processGuideRouter.get(acceptanceURL, addSteps, getAcceptanceController);
processGuideRouter.get(preExaminationURL, addSteps, getPreExaminationController);
processGuideRouter.get(examinationURL, addSteps, getExaminationController);
processGuideRouter.get(recommendationURL, addSteps, getRecommendationController);
processGuideRouter.get(decisionURL, addSteps, getDecisionController);
processGuideRouter.get(postDecisionURL, addSteps, getPostDecisionController);

module.exports = { processGuideRouter };
