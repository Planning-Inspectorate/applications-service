const express = require('express');

const config = require('../../config');
const { asyncRoute } = require('../../utils/async-route');
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

const recommendationsController = require('../../controllers/projects/recommendations');
const allExaminationDocsController = require('../../controllers/projects/all-examination-documents');
const projectsController = require('../../controllers/projects/examination');
const aboutTheApplicationController = require('../../controllers/projects/documents/controller');
const {
	examinationTimetableRouter
} = require('../../pages/examination-timetable/examination-timetable.router');

if (!usePrivateBetaV1RoutesOnly) {
	router.get('/', projectSearchController.getProjectList);
	router.get('/all-examination-documents', allExaminationDocsController.getAllExaminationDocuments);
	router.get('/recommendations', recommendationsController.getRecommendations);
	router.get('/:case_ref', projectsController.getExamination);
}

if (hideProjectTimelineLink) {
	router.get('/project-timeline', projectTimeLineController.getProjectTimeLine);
}

if (allowDocumentLibrary) {
	router.get(
		`${subDirectory}${pages.documents.route}`,
		aboutTheApplicationController.getApplicationDocuments
	);
}

if (allowRepresentation) {
	router.get(
		'/:case_ref/representations',
		asyncRoute(representationsController.getRepresentations)
	);
	router.get(
		'/:case_ref/representations/:id',
		asyncRoute(representationsController.getRepresentation)
	);
}

router.use(examinationTimetableRouter);

module.exports = router;
