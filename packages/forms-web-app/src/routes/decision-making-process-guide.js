const express = require('express');
const {
  getDecisionMakingProcessGuide,
  getPreApplication,
} = require('../controllers/decision-making-process-guide');

const router = express.Router();
router.get('/decision-making-process-guide', getDecisionMakingProcessGuide);
router.get('/decision-making-process-guide/pre-application', getPreApplication);

module.exports = router;
