const express = require('express');

const { getProjectsIndexController } = require('./index/controller');
const { getProjectsDocumentsController } = require('./documents/controller');
const { getProjectsAllUpdatesController } = require('./all-updates/controller');
const {
	getProjectsExaminationTimetableController,
	postProjectsExaminationTimetableController
} = require('./examination-timetable/controller');

const { getProjectsIndexURL } = require('./index/_utils/get-projects-index-url');
const { getProjectsAllUpdatesURL } = require('./all-updates/_utils/get-projects-all-updates-url');
const { getProjectsDocumentsURL } = require('./documents/_utils/get-projects-documents-url');
const {
	getProjectsExaminationTimetableURL
} = require('./examination-timetable/_utils/get-projects-examination-timetable-url');

const { projectsMiddleware, projectMigrationMiddleware } = require('./_middleware/middleware');

const { section51Router } = require('./section-51/router');
const { representationsRouter } = require('./representations/router');

const { featureFlag } = require('../../config');

const projectsIndexURL = getProjectsIndexURL();
const projectsAllUpdatesURL = getProjectsAllUpdatesURL();
const projectsDocumentsURL = getProjectsDocumentsURL();
const examinationTimetableURL = getProjectsExaminationTimetableURL();

const projectsRouter = express.Router();

if (featureFlag.allowProjectInformation) {
	projectsRouter.get(
		projectsIndexURL,
		[projectsMiddleware, projectMigrationMiddleware],
		getProjectsIndexController
	);
	projectsRouter.get(projectsAllUpdatesURL, projectsMiddleware, getProjectsAllUpdatesController);
}

if (featureFlag.allowDocumentLibrary) {
	projectsRouter.get(projectsDocumentsURL, projectsMiddleware, getProjectsDocumentsController);
}

if (featureFlag.allowExaminationTimetable) {
	projectsRouter.get(
		examinationTimetableURL,
		projectsMiddleware,
		getProjectsExaminationTimetableController
	);
	projectsRouter.post(examinationTimetableURL, postProjectsExaminationTimetableController);
}

if (featureFlag.allowSection51) {
	projectsRouter.use(section51Router);
}

if (featureFlag.allowRepresentation) {
	projectsRouter.use(representationsRouter);
}

module.exports = { projectsRouter };
