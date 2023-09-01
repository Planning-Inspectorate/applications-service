const express = require('express');

const config = require('../../config');
const { asyncRoute } = require('@pins/common/src/utils/async-route');
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
		allowGetUpdates,
		allowProjectInformation
	}
} = config;

const router = express.Router();
const representationsController = require('./relevant-representations/representations');
const examinationTimetable = require('./examination-timetable/controller');
const { getProjectInformation } = require('./project-information/controller');
const aboutTheApplicationController = require('./documents/controller');
const section51Router = require('./section-51/section-51.router');
const { middleware, projectMigrationMiddleware } = require('./_middleware/middleware');
const { featureFlag } = require('../../config');
const { getUpdatesRouter } = require('./get-updates/router');
const { getProjectUpdatesController } = require('./project-updates/controller');
const { getProjectRegister } = require('./project-register/controller');

if (allowProjectInformation) {
	router.get('/:case_ref', [middleware, projectMigrationMiddleware], getProjectInformation);
	router.get('/:case_ref/project-updates', middleware, getProjectUpdatesController);
	router.get('/register', asyncRoute(getProjectRegister));
}

if (allowDocumentLibrary) {
	router.get(
		`${subDirectory}${pages.documents.route}`,
		middleware,
		aboutTheApplicationController.getApplicationDocuments
	);
}

if (allowExaminationTimetable) {
	router.get(
		`${subDirectory}${pages.examinationTimetable.route}`,
		middleware,
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
		middleware,
		asyncRoute(representationsController.getRepresentations)
	);
	router.get(
		'/:case_ref/representations/:id',
		middleware,
		asyncRoute(representationsController.getRepresentation)
	);
}

if (allowGetUpdates) router.use(getUpdatesRouter);

// Section 51
if (featureFlag.allowSection51) {
	router.use(section51Router);
}

module.exports = router;
