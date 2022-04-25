const express = require('express');

const router = express.Router();
const aboutTheApplicationRouter = require('./documents');
const projectTimeLineController = require('../../controllers/projects/project-timeline');
const representationsController = require('../../controllers/projects/representations');
const timetableController = require('../../controllers/projects/timetable');
const recommendationsController = require('../../controllers/projects/recommendations');
const allExaminationDocsController = require('../../controllers/projects/all-examination-documents');

router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
router.get('/recommendations', recommendationsController.getRecommendations);
router.get('/timetable', timetableController.getTimetable);
router.get('/representations', representationsController.getRepresentations);
router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);

router.use(aboutTheApplicationRouter);

module.exports = router;
