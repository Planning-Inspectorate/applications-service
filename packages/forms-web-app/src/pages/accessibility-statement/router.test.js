const { getAccessibilityStatementController } = require('./controller');

describe('pages/accessibility-statement/router', () => {
	const get = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the accessibility statement route and controller', () => {
		expect(get).toHaveBeenCalledWith(
			'/accessibility-statement',
			getAccessibilityStatementController
		);
		expect(get).toHaveBeenCalledTimes(1);
	});
});
