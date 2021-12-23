const express = require('express');
const overviewController = require('../controllers/overview');
const projectTimeLineController = require('../controllers/project-timeline');

const router = express.Router();

router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
router.get('/:case_ref', overviewController.getOverview);

module.exports = router;
