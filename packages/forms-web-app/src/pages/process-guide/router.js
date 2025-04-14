const express = require('express');

const { getProcessGuideController } = require('./index/controller');
const { getPreApplicationController } = require('./pre-application/controller');
const { getAcceptanceController } = require('./acceptance/controller');
const { getPreExaminationController } = require('./pre-examination/controller');
const { getExaminationController } = require('./examination/controller');
const { getRecommendationController } = require('./recommendation/controller');
const { getDecisionController } = require('./decision/controller');
const { getPostDecisionController } = require('./post-decision/controller');

const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	addProcessGuideTranslationsMiddleware
} = require('./_middleware/add-process-guide-translations-middleware');
const {
	addProcessGuideStepsMiddleware
} = require('./_middleware/add-process-guide-steps-middleware');
const {
	addIndexTranslationsMiddleware
} = require('./index/_middleware/add-index-translations-middleware');
const {
	addPreApplicationTranslationsMiddleware
} = require('./pre-application/_middleware/add-pre-application-translations-middleware');
const {
	addAcceptanceTranslationsMiddleware
} = require('./acceptance/_middleware/add-acceptance-translations-middleware');
const {
	addPreExaminationTranslationsMiddleware
} = require('./pre-examination/_middleware/add-pre-examination-translations-middleware');
const {
	addExaminationTranslationsMiddleware
} = require('./examination/_middleware/add-examination-translations-middleware');
const {
	addRecommendationTranslationsMiddleware
} = require('./recommendation/_middleware/add-recommendation-translations-middleware');
const {
	addDecisionTranslationsMiddleware
} = require('./decision/_middleware/add-decision-translations-middleware');
const {
	addPostDecisionTranslationsMiddleware
} = require('./post-decision/_middleware/add-post-decision-translations-middleware');
const { cacheNoCacheMiddleware } = require('../../middleware/cache-control');

const { processGuideURL } = require('./index/config');
const { preApplicationURL } = require('./pre-application/config');
const { acceptanceURL } = require('./acceptance/config');
const { preExaminationURL } = require('./pre-examination/config');
const { examinationURL } = require('./examination/config');
const { recommendationURL } = require('./recommendation/config');
const { decisionURL } = require('./decision/config');
const { postDecisionURL } = require('./post-decision/config');

const processGuideRouter = express.Router();

processGuideRouter.use(
	addCommonTranslationsMiddleware,
	addProcessGuideTranslationsMiddleware,
	cacheNoCacheMiddleware
);

processGuideRouter.get(
	processGuideURL,
	addIndexTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getProcessGuideController
);
processGuideRouter.get(
	preApplicationURL,
	addPreApplicationTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getPreApplicationController
);
processGuideRouter.get(
	acceptanceURL,
	addAcceptanceTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getAcceptanceController
);
processGuideRouter.get(
	preExaminationURL,
	addPreExaminationTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getPreExaminationController
);
processGuideRouter.get(
	examinationURL,
	addExaminationTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getExaminationController
);
processGuideRouter.get(
	recommendationURL,
	addRecommendationTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getRecommendationController
);
processGuideRouter.get(
	decisionURL,
	addDecisionTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getDecisionController
);
processGuideRouter.get(
	postDecisionURL,
	addPostDecisionTranslationsMiddleware,
	addProcessGuideStepsMiddleware,
	getPostDecisionController
);

module.exports = { processGuideRouter };
