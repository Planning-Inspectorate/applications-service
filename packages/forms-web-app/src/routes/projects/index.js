const express = require('express');

const config = require('../../config');

const {
	featureFlag: {
		hideProjectTimelineLink,
		allowDocumentLibrary,
		allowRepresentation,
		usePrivateBetaV1RoutesOnly
	}
} = config;

const router = express.Router();
const projectSearchController = require('../../controllers/project-search');
const documentsRouter = require('./documents');
const projectTimeLineController = require('../../controllers/projects/project-timeline');
const representationsController = require('../../controllers/projects/representations');
const timetableController = require('../../controllers/projects/timetable');
const recommendationsController = require('../../controllers/projects/recommendations');
const allExaminationDocsController = require('../../controllers/projects/all-examination-documents');

if (!usePrivateBetaV1RoutesOnly) {
	router.get('/', projectSearchController.getProjectList);
	router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
	router.get('/recommendations', recommendationsController.getRecommendations);
	router.get('/timetable', timetableController.getTimetable);
}

if (hideProjectTimelineLink) {
	router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
}

if (allowDocumentLibrary) {
	router.use(documentsRouter);
}

if (allowRepresentation) {
	router.get('/:case_ref/representations/:id', representationsController.getRepresentation);
	router.get('/:case_ref/representations', representationsController.getRepresentations);
}

module.exports = router;
