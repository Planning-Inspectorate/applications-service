const express = require('express');

const config = require('../../config');
const {
	routesConfig: {
		project: { pages }
	},
	routesConfig: {
		project: { subDirectory }
	}
} = require('../../routes/config');

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
const projectTimeLineController = require('../../controllers/projects/project-timeline');
const representationsController = require('../../controllers/projects/representations');
const examinationTimetable = require('../../controllers/projects/examination-timetable');
const recommendationsController = require('../../controllers/projects/recommendations');
const allExaminationDocsController = require('../../controllers/projects/all-examination-documents');
const projectsController = require('../../controllers/projects/examination');
const aboutTheApplicationController = require('../../controllers/projects/documents');

if (!usePrivateBetaV1RoutesOnly) {
	router.get('/', projectSearchController.getProjectList);
	router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
	router.get('/recommendations', recommendationsController.getRecommendations);
	router.get(
		subDirectory + pages.examinationTimetable.route,
		examinationTimetable.getExaminationTimetable
	);
	router.post(
		subDirectory + pages.examinationTimetable.route,
		examinationTimetable.postExaminationTimetable
	);
	router.get('/:case_ref', projectsController.getExamination);
}

if (hideProjectTimelineLink) {
	router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
}

if (allowDocumentLibrary) {
	router.get(
		'/:case_ref/application-documents',
		aboutTheApplicationController.getApplicationDocuments
	);
}

if (allowRepresentation) {
	router.get('/:case_ref/representations', representationsController.getRepresentations);
	router.get('/:case_ref/representations/:id', representationsController.getRepresentation);
}

module.exports = router;
