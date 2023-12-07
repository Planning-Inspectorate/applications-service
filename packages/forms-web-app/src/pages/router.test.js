const { getIndexController } = require('./index/controller');
const { getContactController } = require('./contact/controller');
const { getDetailedInformationController } = require('./detailed-information/controller');
const { getProjectSearchController } = require('./project-search/controller');
const { getRegisterOfApplicationsController } = require('./register-of-applications/controller');

const { projectsRouter } = require('./projects/router');

jest.mock('../config', () => {
	const originalConfig = jest.requireActual('../config');

	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true,
			usePrivateBetaV1RoutesOnly: false
		}
	};
});

describe('pages/router', () => {
	describe('#pagesRouter', () => {
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

		it('should call the pages routes and controllers', () => {
			expect(get).toHaveBeenCalledWith('/', getIndexController);

			expect(get).toHaveBeenCalledWith('/contact', getContactController);

			expect(get).toHaveBeenCalledWith('/detailed-information', getDetailedInformationController);

			expect(get).toHaveBeenCalledWith('/project-search', getProjectSearchController);

			expect(get).toHaveBeenCalledWith(
				'/register-of-applications',
				getRegisterOfApplicationsController
			);

			expect(use).toHaveBeenCalledWith(projectsRouter);

			expect(get).toBeCalledTimes(5);
			expect(post).toBeCalledTimes(0);
			expect(use).toBeCalledTimes(1);
		});
	});
});
