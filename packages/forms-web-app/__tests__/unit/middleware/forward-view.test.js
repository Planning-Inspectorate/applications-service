const { forwardView } = require('../../../src/middleware/forward-view');
const { mockReq, mockRes } = require('../mocks');
const {
	routesConfig: {
		examination: {
			pages: { nameAgent }
		}
	}
} = require('../../../src/routes/config.js');

describe('All forwardView test cases', () => {
	let req;
	let res;

	beforeEach(() => {
		req = { ...mockReq, session: { currentView: {} } };
		res = mockRes;
	});

	afterEach(() => {
		jest.resetAllMocks();
	});
	it('pass view object to forward-view middleware', () => {
		const next = jest.fn();
		forwardView(nameAgent)(req, res, next);
		expect(next).toHaveBeenCalled();
		expect(req.session.currentView).toStrictEqual(nameAgent);
	});

	it("don't pass any argument to forward-view middleware", () => {
		const next = jest.fn();
		forwardView()(req, res, next);
		expect(next).toHaveBeenCalled();
		expect(req.session.currentView).toStrictEqual({});
	});
});
