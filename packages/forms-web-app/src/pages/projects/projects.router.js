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
		allowGetUpdates,
		allowProjectInformation
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
const { getProjectUpdatesStart } = require('./project-updates/start/controller');
const {
	getProjectUpdatesEmail,
	postProjectUpdatesEmail
} = require('./project-updates/email/controller');
const {
	getProjectUpdatesHowOften,
	postProjectUpdatesHowOften
} = require('./project-updates/how-often/controller');
const {
	getProjectUpdatesConfirmYourEmail
} = require('./project-updates/confirm-your-email/controller');
const { getProjectUpdatesSubscribed } = require('./project-updates/subscribed/controller');
const {
	getProjectUpdatesUnsubscribe,
	postProjectUpdatesUnsubscribe
} = require('./project-updates/unsubscribe/controller');
const { getProjectUpdatesUnsubscribed } = require('./project-updates/unsubscribed/controller');
const { emailValidationRules } = require('../../validators/shared/email-address');
const { howOftenValidationRules } = require('./project-updates/how-often/validator');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { projectUpdatesRoutes } = require('./project-updates/_utils/project-updates-routes');

if (!usePrivateBetaV1RoutesOnly) {
	router.get('/', projectSearchController.getProjectList);
}

if (allowProjectInformation) {
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
	router.get(
		`/:case_ref/get-updates/${projectUpdatesRoutes.start}`,
		middleware,
		getProjectUpdatesStart
	);

	router.get(`/:case_ref/get-updates/${projectUpdatesRoutes.email}`, getProjectUpdatesEmail);
	router.post(
		`/:case_ref/get-updates/${projectUpdatesRoutes.email}`,
		emailValidationRules(),
		validationErrorHandler,
		postProjectUpdatesEmail
	);

	router.get(`/:case_ref/get-updates/${projectUpdatesRoutes.howOften}`, getProjectUpdatesHowOften);
	router.post(
		`/:case_ref/get-updates/${projectUpdatesRoutes.howOften}`,
		howOftenValidationRules(),
		validationErrorHandler,
		postProjectUpdatesHowOften
	);

	router.get(
		`/:case_ref/get-updates/${projectUpdatesRoutes.confirm}`,
		middleware,
		getProjectUpdatesConfirmYourEmail
	);

	router.get(
		`/:case_ref/get-updates/${projectUpdatesRoutes.subscribed}`,
		middleware,
		getProjectUpdatesSubscribed
	);

	router.get(
		`/:case_ref/get-updates/${projectUpdatesRoutes.unsubscribe}`,
		middleware,
		getProjectUpdatesUnsubscribe
	);
	router.post(
		`/:case_ref/get-updates/${projectUpdatesRoutes.unsubscribe}`,
		postProjectUpdatesUnsubscribe
	);

	router.get(
		`/:case_ref/get-updates/${projectUpdatesRoutes.unsubscribed}`,
		middleware,
		getProjectUpdatesUnsubscribed
	);
}

// Section 51
if (featureFlag.allowSection51) {
	router.use(section51Router);
}

module.exports = router;
