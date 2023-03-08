const express = require('express');

const config = require('../../config');
const { asyncRoute } = require('../../utils/async-route');
const {
	routesConfig: {
		project: { pages, subDirectory }
	}
} = require('../../routes/config');

const {
	featureFlag: {
		allowDocumentLibrary,
		allowExaminationTimetable,
		allowRepresentation,
		usePrivateBetaV1RoutesOnly
	}
} = config;

const router = express.Router();
const projectSearchController = require('./project-search/project-search');
const representationsController = require('./relevant-representations/representations');
const examinationTimetable = require('./examination-timetable/controller');
const projectsController = require('./examination/examination');
const aboutTheApplicationController = require('./documents/controller');
const section51Router = require('./section-51/section-51.router');
const { verticalTabs } = require('./middleware');

if (!usePrivateBetaV1RoutesOnly) {
	router.get('/', projectSearchController.getProjectList);
	router.get('/:case_ref', verticalTabs, projectsController.getExamination);
}

if (allowDocumentLibrary) {
	router.get(
		`${subDirectory}${pages.documents.route}`,
		verticalTabs,
		aboutTheApplicationController.getApplicationDocuments
	);
}

if (allowExaminationTimetable) {
	router.get(
		`${subDirectory}${pages.examinationTimetable.route}`,
		verticalTabs,
		examinationTimetable.getExaminationTimetable
	);
	router.post(
		`${subDirectory}${pages.examinationTimetable.route}`,
		examinationTimetable.postExaminationTimetable
	);
}

if (allowRepresentation) {
	router.get(
		'/:case_ref/representations',
		verticalTabs,
		asyncRoute(representationsController.getRepresentations)
	);
	router.get(
		'/:case_ref/representations/:id',
		verticalTabs,
		asyncRoute(representationsController.getRepresentation)
	);
}

// Section 51
router.use(section51Router);
// router.get('/:case_ref/s51advice', getSection51);

module.exports = router;
