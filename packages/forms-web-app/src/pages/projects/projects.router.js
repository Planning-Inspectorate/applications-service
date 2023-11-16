const express = require('express');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const config = require('../../config');
const { featureFlag } = require('../../config');

const {
	routesConfig: {
		project: { pages, subDirectory }
	}
} = require('../../routes/config');

const representationsController = require('./relevant-representations/representations');
const examinationTimetable = require('./examination-timetable/controller');
const aboutTheApplicationController = require('./documents/controller');
const section51Router = require('./section-51/section-51.router');
const { getUpdatesRouter } = require('./get-updates/router');
const { getProjectUpdatesController } = require('./project-updates/controller');

const { projectsMiddleware } = require('./_middleware/middleware');

const projectsRouter = express.Router();

const {
	featureFlag: {
		allowDocumentLibrary,
		allowExaminationTimetable,
		allowRepresentation,
		allowGetUpdates,
		allowProjectInformation
	}
} = config;

if (allowProjectInformation) {
	projectsRouter.get('/:case_ref/project-updates', projectsMiddleware, getProjectUpdatesController);
}

if (allowDocumentLibrary) {
	projectsRouter.get(
		`${subDirectory}${pages.documents.route}`,
		projectsMiddleware,
		aboutTheApplicationController.getApplicationDocuments
	);
}

if (allowExaminationTimetable) {
	projectsRouter.get(
		`${subDirectory}${pages.examinationTimetable.route}`,
		projectsMiddleware,
		examinationTimetable.getExaminationTimetable
	);
	projectsRouter.post(
		`${subDirectory}${pages.examinationTimetable.route}`,
		examinationTimetable.postExaminationTimetable
	);
}

if (allowRepresentation) {
	projectsRouter.get(
		'/:case_ref/representations',
		projectsMiddleware,
		asyncRoute(representationsController.getRepresentations)
	);
	projectsRouter.get(
		'/:case_ref/representations/:id',
		projectsMiddleware,
		asyncRoute(representationsController.getRepresentation)
	);
}

if (allowGetUpdates) projectsRouter.use(getUpdatesRouter);

// Section 51
if (featureFlag.allowSection51) {
	projectsRouter.use(section51Router);
}

module.exports = projectsRouter;
