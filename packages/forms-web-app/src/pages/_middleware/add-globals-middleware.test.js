const { addGlobalsMiddleware } = require('./add-globals-middleware');

jest.mock('../../config', () => {
	const originalConfig = jest.requireActual('../config');

	return {
		...originalConfig,
		featureFlag: {
			allowHomepage: true,
			usePrivateBetaV1RoutesOnly: false
		}
	};
});

describe('pages/_middleware/add-globals-middleware', () => {
	describe('#addGlobalsMiddleware', () => {
		const req = {
			url: '/'
		};
		const res = {
			locals: {}
		};
		const next = jest.fn();

		beforeEach(() => {
			addGlobalsMiddleware(req, res, next);
		});

		it('should add the globals to the locals', () => {
			expect(res.locals).toEqual({
				globals: {
					primaryNavigationLinks: [
						{ active: true, href: '/', text: 'Home' },
						{ active: false, href: '/project-search', text: 'All projects' },
						{ active: false, href: '/detailed-information', text: 'Detailed information' }
					]
				}
			});
		});
	});
});
