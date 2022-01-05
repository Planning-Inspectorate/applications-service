const express = require('express');
const router = express.Router();

const examinationController = require('../../controllers/examination/examination');
const projectTimeLineController = require('../../controllers/examination/project-timeline');
const aboutTheApplicationRouter = require('./about-the-application');
const representationsController = require('../../controllers/examination/representations');
const timetableController = require('../../controllers/examination/timetable');
const recommendationsController = require('../../controllers/examination/recommendations');
const allExaminationDocsController = require('../../controllers/examination/all-examination-documents');

router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
router.get('/recommendations', recommendationsController.getRecommendations);
router.get('/timetable', timetableController.getTimetable);
router.get('/representations', representationsController.getRepresentations);
router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
router.use('/about-the-application', aboutTheApplicationRouter);

router.get('/:case_ref', examinationController.getExamination);

module.exports = router;
