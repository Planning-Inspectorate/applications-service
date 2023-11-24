const { getSection51IndexController } = require('./index/controller');
const { getSection51AdviceDetailController } = require('./advice-detail/controller');

const { projectsMiddleware } = require('../_middleware/middleware');

describe('pages/projects/section-51/router', () => {
	describe('#section51Router', () => {
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

		it('should call the section 51 index routes and controllers', () => {
			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/s51advice',
				projectsMiddleware,
				getSection51IndexController
			);

			expect(get).toHaveBeenCalledWith(
				'/projects/:case_ref/s51advice/:id',
				projectsMiddleware,
				getSection51AdviceDetailController
			);

			expect(get).toBeCalledTimes(2);
			expect(post).toBeCalledTimes(0);
			expect(use).toBeCalledTimes(0);
		});
	});
});
