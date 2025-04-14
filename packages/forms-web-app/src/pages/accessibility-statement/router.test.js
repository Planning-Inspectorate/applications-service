const { getAccessibilityStatementController } = require('./controller');
const {
	addAccessibilityStatementTranslationsMiddleware
} = require('./_middleware/add-accessibility-statement-translations-middleware');

describe('pages/accessibility-statement/router', () => {
	const get = jest.fn();
	const use = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get,
			use
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the accessibility statement route and controller', () => {
		expect(get).toHaveBeenCalledWith(
			'/accessibility-statement',
			addAccessibilityStatementTranslationsMiddleware,
			getAccessibilityStatementController
		);
		expect(get).toHaveBeenCalledTimes(1);
	});
});
