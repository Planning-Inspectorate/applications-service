const express = require('express');
const router = express.Router();

const {
	getProjectsApplicationDocuments,
	getProjectExaminationDocuments,
	getProjectsOverview,
	getProjectsTimeLine
} = require('../../controllers/projects');
const projectSearchController = require('../../controllers/project-search');
const representationsController = require('../../controllers/projects/representations');
const timetableController = require('../../controllers/projects/timetable');
const recommendationsController = require('../../controllers/projects/recommendations');

router.get('/:case_ref', getProjectsOverview);
router.get('/:case_ref/application-documents', getProjectsApplicationDocuments);
router.get('/', projectSearchController.getProjectList);
router.get('/all-examination-documents', getProjectExaminationDocuments);
router.get('/recommendations', recommendationsController.getRecommendations);
router.get('/timetable', timetableController.getTimetable);
router.get('/:case_ref/representations/:id', representationsController.getRepresentation);
router.get('/:case_ref/representations', representationsController.getRepresentations);
router.get('/project-timeline', getProjectsTimeLine);

module.exports = router;
