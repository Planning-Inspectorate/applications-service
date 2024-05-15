const { addProcessGuideStepsMiddleware } = require('./add-process-guide-steps-middleware');

const { getProcessGuideSteps } = require('../_utils/get-process-guide-steps');

jest.mock('../_utils/get-process-guide-steps', () => ({
	getProcessGuideSteps: jest.fn()
}));

describe('pages/process-guide/_middleware/add-process-guide-steps-middleware', () => {
	const mockReq = {
		path: 'mock path'
	};
	const mockRes = {
		locals: {}
	};
	const mockNext = jest.fn();

	beforeEach(() => {
		getProcessGuideSteps.mockReturnValue({
			processGuideSteps: 'mock value'
		});
		addProcessGuideStepsMiddleware(mockReq, mockRes, mockNext);
	});

	it('should add the mock process guide steps to the locals', () => {
		expect(mockRes.locals).toEqual({ processGuide: { processGuideSteps: 'mock value' } });
	});
});
