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
		usePrivateBetaV1RoutesOnly,
		allowGetUpdates
	}
} = config;

const router = express.Router();
const projectSearchController = require('./project-search/project-search');
const representationsController = require('./relevant-representations/representations');
const examinationTimetable = require('./examination-timetable/controller');
const projectsController = require('./examination/examination');
const aboutTheApplicationController = require('./documents/controller');
const section51Router = require('./section-51/section-51.router');
const { middleware } = require('./_middleware/middleware');
const { featureFlag } = require('../../config');
const { getProjectUpdates } = require('./project-updates/controller');
const {
	getProjectUpdatesEmail,
	postProjectUpdatesEmail
} = require('./project-updates/project-updates-email/project-updates-email.controller');
const { emailValidationRules } = require('../../validators/shared/email-address');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
if (!usePrivateBetaV1RoutesOnly) {
	router.get('/', projectSearchController.getProjectList);
	router.get('/:case_ref', middleware, projectsController.getExamination);
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

if (allowGetUpdates) {
	router.get('/:case_ref/get-updates/start', middleware, getProjectUpdates);
	router.get('/:case_ref/get-updates/email', middleware, getProjectUpdatesEmail);
	router.post(
		'/:case_ref/get-updates/email',
		middleware,
		emailValidationRules(),
		validationErrorHandler,
		postProjectUpdatesEmail
	);
}

// Section 51
if (featureFlag.allowSection51) {
	router.use(section51Router);
}

module.exports = router;
