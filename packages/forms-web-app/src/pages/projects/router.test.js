const { getProjectsIndexController } = require('./index/controller');
const { getProjectsAllUpdatesController } = require('./all-updates/controller');
const { getProjectsDocumentsController } = require('./documents/controller');
const {
	getProjectsExaminationTimetableController,
	postProjectsExaminationTimetableController
} = require('./examination-timetable/controller');

const { section51Router } = require('./section-51/router');
const { representationsRouter } = require('./representations/router');
const { getUpdatesRouter } = require('./get-updates/router');
const { registerRouter } = require('./register/router');

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

jest.mock('../../config', () => {
	const originalConfig = jest.requireActual('../../config');

	return {
		...originalConfig,
		featureFlag: {
			allowProjectInformation: true
		}
	};
});

describe('pages/projects/router', () => {
	describe('#projectsRouter', () => {
		const get = jest.fn();
		const post = jest.fn();
		const use = jest.fn();

		jest.doMock('express', () => ({
			Router: () => ({
				get,
				post,
				use
			})
		}));

		beforeEach(() => {
			require('./router');
		});

		it('should call the projects routes and controllers', () => {
			expect(use).toBeCalledWith(addProjectsTranslationsMiddleware);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref',
				projectsMiddleware,
				addCommonTranslationsMiddleware,
				addProcessGuideTranslationsMiddleware,
				addProjectsIndexTranslationsMiddleware,
				getProjectsIndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/project-updates',
				projectsMiddleware,
				getProjectsAllUpdatesController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/documents',
				projectsMiddleware,
				addCheckboxAccordionTranslationsMiddleware,
				addCommonTranslationsMiddleware,
				addProjectsDocumentsTranslationsMiddleware,
				getProjectsDocumentsController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/examination-timetable',
				projectsMiddleware,
				addCommonTranslationsMiddleware,
				addExaminationTimetableTranslationsMiddleware,
				getProjectsExaminationTimetableController
			);

			expect(post).toHaveBeenCalledWith(
				'/projects/:case_ref/examination-timetable',
				postProjectsExaminationTimetableController
			);

			expect(use).toHaveBeenCalledWith(section51Router);

			expect(use).toHaveBeenCalledWith(representationsRouter);

			expect(use).toHaveBeenCalledWith(getUpdatesRouter);

			expect(use).toHaveBeenCalledWith(registerRouter);

			expect(get).toBeCalledTimes(4);
			expect(post).toBeCalledTimes(1);
			expect(use).toBeCalledTimes(5);
		});
	});
});
