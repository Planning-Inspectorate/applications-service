const express = require('express');
const { getDecisionMakingProcessGuide } = require('../controllers/decision-making-process-guide');

const router = express.Router();
router.get('/decision-making-process-guide', getDecisionMakingProcessGuide);

module.exports = router;
