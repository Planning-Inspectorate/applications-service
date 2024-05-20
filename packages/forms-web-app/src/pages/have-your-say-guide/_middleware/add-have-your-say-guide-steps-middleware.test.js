const {
	addHaveYourSayGuideStepsMiddleware
} = require('./add-have-your-say-guide-steps-middleware');

const { getHaveYourSayGuideSteps } = require('../_utils/get-have-your-say-guide-steps');

jest.mock('../_utils/get-have-your-say-guide-steps', () => ({
	getHaveYourSayGuideSteps: jest.fn()
}));

describe('pages/have-your-say-guide/_middleware/add-have-your-say-guide-steps-middleware', () => {
	describe('#addHaveYourSayGuideStepsMiddleware', () => {
		const mockReq = {
			path: 'mock path'
		};
		const mockRes = {
			locals: {}
		};
		const mockNext = jest.fn();

		beforeEach(() => {
			getHaveYourSayGuideSteps.mockReturnValue({
				haveYourSaySteps: 'mock value'
			});
			addHaveYourSayGuideStepsMiddleware(mockReq, mockRes, mockNext);
		});

		it('should add the mock have your say guide steps to the locals', () => {
			expect(mockRes.locals).toEqual({ haveYourSayGuide: { haveYourSaySteps: 'mock value' } });
		});
	});
});
