const express = require('express');
const {
  getDecisionMakingProcessGuide,
  getPreApplication,
  getExaminationOfTheApplication,
  getReviewOfTheApplication,
  getPreExamination,
  getRecommendationAndDecision,
  getWhatHappensAfterTheDecisionIsMade,
} = require('../controllers/decision-making-process-guide');

const router = express.Router();
router.get('/decision-making-process-guide', getDecisionMakingProcessGuide);
router.get('/decision-making-process-guide/pre-application', getPreApplication);
router.get(
  '/decision-making-process-guide/examination-of-the-application',
  getExaminationOfTheApplication
);
router.get('/decision-making-process-guide/review-of-the-application', getReviewOfTheApplication);
router.get('/decision-making-process-guide/pre-examination', getPreExamination);
router.get(
  '/decision-making-process-guide/recommendation-and-decision',
  getRecommendationAndDecision
);
router.get(
  '/decision-making-process-guide/what-happens-after-the-decision-is-made',
  getWhatHappensAfterTheDecisionIsMade
);

module.exports = router;
