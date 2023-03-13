const { getSection51 } = require('./section-51.controller');
const { middleware } = require('../middleware');

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
			it('should add the controller to the route', () => {
				expect(router.get).toHaveBeenCalledWith('/:case_ref/s51advice', middleware, getSection51);
			});
		});
	});
});
