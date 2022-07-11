const express = require('express');

const router = express.Router();

const {
	routes: {
		internal: {
			decisionMakingProcessGuide: { routes }
		}
	}
} = require('../routes/config');

const {
	getDecisionMakingProcessGuide,
	getPreApplication,
	getExaminationOfTheApplication,
	getReviewOfTheApplication,
	getPreExamination,
	getRecommendationAndDecision,
	getWhatHappensAfterTheDecisionIsMade
} = require('../controllers/decision-making-process-guide');

router.get(routes.index, getDecisionMakingProcessGuide);
router.get(routes.preApplication, getPreApplication);
router.get(routes.applicationExamination, getExaminationOfTheApplication);
router.get(routes.applicationReview, getReviewOfTheApplication);
router.get(routes.preExamination, getPreExamination);
router.get(routes.recommendationAndDecision, getRecommendationAndDecision);
router.get(routes.afterDecision, getWhatHappensAfterTheDecisionIsMade);

module.exports = router;
