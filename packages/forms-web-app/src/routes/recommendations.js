const express = require('express');
const recommendationsController = require('../controllers/recommendations');

const router = express.Router();

router.get('/:case_ref', recommendationsController.getRecommendations);

module.exports = router;
