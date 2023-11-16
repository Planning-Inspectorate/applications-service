const { getSection51 } = require('./section-51.controller');
const { projectsMiddleware } = require('../_middleware/middleware');
const {
	getSection51AdviceDetail
} = require('./section-51-advice-detail/section-51-advice-detail.controller');

jest.mock('express', () => ({
	Router: () => ({
		get: jest.fn()
	})
}));
describe('#section51Router', () => {
	describe('When getting the router for section 51', () => {
		let router;
		beforeEach(() => {
			router = require('./section-51.router');
		});
		describe('and the route is /', () => {
			it('should mount the routes/_middleware/controllers for section 51', () => {
				expect(router.get).toHaveBeenCalledWith(
					'/:case_ref/s51advice',
					projectsMiddleware,
					getSection51
				);
				expect(router.get).toHaveBeenCalledWith(
					'/:case_ref/s51advice/:id',
					projectsMiddleware,
					getSection51AdviceDetail
				);
			});
		});
	});
});
