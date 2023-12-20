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

const { projectsMiddleware, projectMigrationMiddleware } = require('./_middleware/middleware');
const { registerRouter } = require('./register/router');

jest.mock('../../config', () => {
	const originalConfig = jest.requireActual('../../config');

	return {
		...originalConfig,
		featureFlag: {
			allowProjectInformation: true,
			allowDocumentLibrary: true,
			allowExaminationTimetable: true,
			allowSection51: true,
			allowRepresentation: true,
			allowGetUpdates: true
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
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref',
				[projectsMiddleware, projectMigrationMiddleware],
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
				getProjectsDocumentsController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/examination-timetable',
				projectsMiddleware,
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
			expect(use).toBeCalledTimes(4);
		});
	});
});
