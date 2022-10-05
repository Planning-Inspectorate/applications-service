const {
	getCheckYourAnswers
} = require('../../../../src/controllers/examination/check-your-answers');
const { mockReq, mockRes } = require('../../mocks');

const pageData = {
	pageTitle: 'Check your answers',
	title: 'Check your answers'
};

describe('controllers/examination/check-your-answers', () => {
	let req;
	let res;

	beforeEach(() => {
		req = mockReq();
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getCheckYourAnswers', () => {
		it('should call the correct template', () => {
			const mockRequest = { ...req };

			getCheckYourAnswers(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/check-your-answers', pageData);
		});
	});
});
