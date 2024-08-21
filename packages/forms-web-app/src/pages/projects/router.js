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

const {
	addProjectsTranslationsMiddleware
} = require('./_middleware/add-projects-translations-middleware');
const {
	addCommonTranslationsMiddleware
} = require('../_middleware/i18n/add-common-translations-middleware');
const {
	addCheckboxAccordionTranslationsMiddleware
} = require('../_translations/components/checkbox-accordion/add-checkbox-accordion-translations-middleware');
const { projectsMiddleware } = require('./_middleware/middleware');
const {
	addProcessGuideTranslationsMiddleware
} = require('../process-guide/_middleware/add-process-guide-translations-middleware');
const {
	addProjectsIndexTranslationsMiddleware
} = require('./index/_middleware/add-projects-index-translations-middleware');
const {
	addProjectsDocumentsTranslationsMiddleware
} = require('./documents/_middleware/add-projects-documents-translations-middleware');
const {
	addExaminationTimetableTranslationsMiddleware
} = require('./examination-timetable/_middleware/add-examination-timetable-translations-middleware');

const { section51Router } = require('./section-51/router');
const { representationsRouter } = require('./representations/router');
const { getUpdatesRouter } = require('./get-updates/router');
const { registerRouter } = require('./register/router');

const { featureFlag } = require('../../config');

const projectsIndexURL = getProjectsIndexURL();
const projectsAllUpdatesURL = getProjectsAllUpdatesURL();
const projectsDocumentsURL = getProjectsDocumentsURL();
const examinationTimetableURL = getProjectsExaminationTimetableURL();

const projectsRouter = express.Router();

projectsRouter.use(addProjectsTranslationsMiddleware);

if (featureFlag.allowProjectInformation) {
	projectsRouter.get(
		projectsIndexURL,
		projectsMiddleware,
		addCommonTranslationsMiddleware,
		addProcessGuideTranslationsMiddleware,
		addProjectsIndexTranslationsMiddleware,
		getProjectsIndexController
	);
	projectsRouter.get(projectsAllUpdatesURL, projectsMiddleware, getProjectsAllUpdatesController);
}

projectsRouter.get(
	projectsDocumentsURL,
	projectsMiddleware,
	addCheckboxAccordionTranslationsMiddleware,
	addCommonTranslationsMiddleware,
	addProjectsDocumentsTranslationsMiddleware,
	getProjectsDocumentsController
);

projectsRouter.get(
	examinationTimetableURL,
	projectsMiddleware,
	addCommonTranslationsMiddleware,
	addExaminationTimetableTranslationsMiddleware,
	getProjectsExaminationTimetableController
);
projectsRouter.post(examinationTimetableURL, postProjectsExaminationTimetableController);

projectsRouter.use(section51Router);

projectsRouter.use(representationsRouter);

projectsRouter.use(getUpdatesRouter);

projectsRouter.use(registerRouter);

module.exports = { projectsRouter };
