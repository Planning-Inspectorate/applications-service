const express = require('express');
const {
  getDecisionMakingProcessGuide,
  getPreApplication,
  getExaminationOfTheApplication,
} = require('../controllers/decision-making-process-guide');

const router = express.Router();
router.get('/decision-making-process-guide', getDecisionMakingProcessGuide);
router.get('/decision-making-process-guide/pre-application', getPreApplication);
router.get(
  '/decision-making-process-guide/examination-of-the-application',
  getExaminationOfTheApplication
);

module.exports = router;
