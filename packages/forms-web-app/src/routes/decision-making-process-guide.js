const express = require('express');
const {
  getDecisionMakingProcessGuide,
  getPreApplication,
  getExaminationOfTheApplication,
  getReviewOfTheApplication,
} = require('../controllers/decision-making-process-guide');

const router = express.Router();
router.get('/decision-making-process-guide', getDecisionMakingProcessGuide);
router.get('/decision-making-process-guide/pre-application', getPreApplication);
router.get(
  '/decision-making-process-guide/examination-of-the-application',
  getExaminationOfTheApplication
);
router.get('/decision-making-process-guide/review-of-the-application', getReviewOfTheApplication);

module.exports = router;
