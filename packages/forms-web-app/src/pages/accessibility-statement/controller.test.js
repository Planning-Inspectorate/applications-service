const { getAccessibilityStatementController } = require('./controller');

describe('pages/accessibility-statement/controller', () => {
	describe('#getAccessibilityStatementController', () => {
		describe('When there is an issue', () => {
			const mockReq = {};
			const mockRes = {};
			const mockNext = jest.fn();

			beforeEach(() => {
				getAccessibilityStatementController(mockReq, mockRes, mockNext);
			});

			it('should do error', () => {
				expect(mockNext).toBeCalledWith(new TypeError('req.get is not a function'));
			});
		});

		describe('When there are no issues', () => {
			const mockReq = {
				get: jest.fn((id) => mockReq[id]),
				Referrer: 'mock back link url'
			};
			const mockRes = { render: jest.fn() };
			const mockNext = jest.fn();

			beforeEach(() => {
				getAccessibilityStatementController(mockReq, mockRes, mockNext);
			});

			it('should call the correct template with the page data', () => {
				expect(mockRes.render).toBeCalledWith('accessibility-statement/view.njk', {
					backLinkUrl: null,
					pageHeading: 'Accessibility statement for National Infrastructure Projects',
					pageTitle: 'Accessibility statement for National Infrastructure Projects'
				});
			});
		});
	});
});
