const { projectsMiddleware, projectMigrationMiddleware } = require('./_middleware/middleware');
const { getProjectsIndexController } = require('./index/controller');

describe('pages/projects/router', () => {
	const get = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get
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
		expect(get).toBeCalledTimes(1);
	});
});
