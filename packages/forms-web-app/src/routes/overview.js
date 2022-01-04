const express = require('express');
const projectTimeLineController = require('../controllers/project-timeline');

const router = express.Router();

router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);

module.exports = router;
