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
const { getGetUpdatesStart } = require('./get-updates/start/controller');
const { getGetUpdatesEmail, postGetUpdatesEmail } = require('./get-updates/email/controller');
const {
	getGetUpdatesHowOften,
	postGetUpdatesHowOften
} = require('./get-updates/how-often/controller');
const { getGetUpdatesConfirmYourEmail } = require('./get-updates/confirm-your-email/controller');
const { getGetUpdatesSubscribed } = require('./get-updates/subscribed/controller');
const {
	getGetUpdatesUnsubscribe,
	postGetUpdatesUnsubscribe
} = require('./get-updates/unsubscribe/controller');
const { getGetUpdatesUnsubscribed } = require('./get-updates/unsubscribed/controller');
const { emailValidationRules } = require('../../validators/shared/email-address');
const { howOftenValidationRules } = require('./get-updates/how-often/validator');
const { validationErrorHandler } = require('../../validators/validation-error-handler');
const { getUpdatesRoutes } = require('./get-updates/_utils/get-updates-routes');

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
	router.get(`/:case_ref/get-updates/${getUpdatesRoutes.start}`, middleware, getGetUpdatesStart);

	router.get(`/:case_ref/get-updates/${getUpdatesRoutes.email}`, getGetUpdatesEmail);
	router.post(
		`/:case_ref/get-updates/${getUpdatesRoutes.email}`,
		emailValidationRules(),
		validationErrorHandler,
		postGetUpdatesEmail
	);

	router.get(`/:case_ref/get-updates/${getUpdatesRoutes.howOften}`, getGetUpdatesHowOften);
	router.post(
		`/:case_ref/get-updates/${getUpdatesRoutes.howOften}`,
		howOftenValidationRules(),
		validationErrorHandler,
		postGetUpdatesHowOften
	);

	router.get(
		`/:case_ref/get-updates/${getUpdatesRoutes.confirm}`,
		middleware,
		getGetUpdatesConfirmYourEmail
	);

	router.get(
		`/:case_ref/get-updates/${getUpdatesRoutes.subscribed}`,
		middleware,
		getGetUpdatesSubscribed
	);

	router.get(
		`/:case_ref/get-updates/${getUpdatesRoutes.unsubscribe}`,
		middleware,
		getGetUpdatesUnsubscribe
	);
	router.post(`/:case_ref/get-updates/${getUpdatesRoutes.unsubscribe}`, postGetUpdatesUnsubscribe);

	router.get(
		`/:case_ref/get-updates/${getUpdatesRoutes.unsubscribed}`,
		middleware,
		getGetUpdatesUnsubscribed
	);
}

// Section 51
if (featureFlag.allowSection51) {
	router.use(section51Router);
}

module.exports = router;
