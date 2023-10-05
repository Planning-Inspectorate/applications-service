const { getProcessGuideController } = require('./controller');

describe('pages/process-guide/router', () => {
	const get = jest.fn();

	jest.doMock('express', () => ({
		Router: () => ({
			get
		})
	}));

	beforeEach(() => {
		require('./router');
	});

	it('should call the process guide routes and controllers', () => {
		expect(get).toHaveBeenCalledWith('/decision-making-process-guide', getProcessGuideController);
	});
});
