const express = require('express');
const router = express.Router();

const examinationController = require('../../controllers/examination/examination');
const projectTimeLineController = require('../../controllers/examination/project-timeline');
const aboutTheApplicationRouter = require('./about-the-application');
const representationsController = require('../../controllers/examination/representations');

router.get('/representations', representationsController.getRepresentations);
router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
router.use('/about-the-application', aboutTheApplicationRouter);

router.get('/:case_ref', examinationController.getExamination);

module.exports = router;
