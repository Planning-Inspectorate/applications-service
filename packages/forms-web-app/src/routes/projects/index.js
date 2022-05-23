const express = require('express');

const router = express.Router();
const projectSearchController = require('../../controllers/project-search');
const documentsRouter = require('./documents');
const projectTimeLineController = require('../../controllers/projects/project-timeline');
const representationsController = require('../../controllers/projects/representations');
const timetableController = require('../../controllers/projects/timetable');
const recommendationsController = require('../../controllers/projects/recommendations');
const allExaminationDocsController = require('../../controllers/projects/all-examination-documents');

router.get('/', projectSearchController.getProjectList);
router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
router.get('/recommendations', recommendationsController.getRecommendations);
router.get('/timetable', timetableController.getTimetable);
router.get('/:case_ref/representations/:id', representationsController.getRepresentation);
router.get('/:case_ref/representations', representationsController.getRepresentations);
router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);

router.use(documentsRouter);

module.exports = router;
