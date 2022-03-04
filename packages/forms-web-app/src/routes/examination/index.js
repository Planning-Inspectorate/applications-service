const express = require('express');
const router = express.Router();
const aboutTheApplicationRouter = require('../../routes/examination/about-the-application');
const examinationController = require('../../controllers/examination/examination');
const projectTimeLineController = require('../../controllers/examination/project-timeline');
const representationsController = require('../../controllers/examination/representations');
const timetableController = require('../../controllers/examination/timetable');
const recommendationsController = require('../../controllers/examination/recommendations');
const allExaminationDocsController = require('../../controllers/examination/all-examination-documents');

router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
router.get('/recommendations', recommendationsController.getRecommendations);
router.get('/timetable', timetableController.getTimetable);
router.get('/representations', representationsController.getRepresentations);
router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);

router.use(aboutTheApplicationRouter);

module.exports = router;
