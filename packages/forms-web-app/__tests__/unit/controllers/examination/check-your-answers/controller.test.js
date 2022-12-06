const {
	getCheckYourAnswers
} = require('../../../../../src/controllers/examination/check-your-answers/controller');

const {
	getPageData
} = require('../../../../../src/controllers/examination/check-your-answers/utils/get-page-data');

jest.mock(
	'../../../../../src/controllers/examination/check-your-answers/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);

describe('controllers/examination/check-your-answers/controller', () => {
	describe('#getCheckYourAnswers', () => {
		const res = { render: jest.fn(), status: jest.fn(() => res) };
		const req = { session: { mockSession: 'mock session' } };
		describe('When getting the check your answers page', () => {
			describe('and there is an error', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('no page data');
					});
					getCheckYourAnswers(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there are no issue', () => {
				const mockPageData = { mockPageData: 'mock page data' };
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageData);
					getCheckYourAnswers(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toBeCalledWith(req.session);
				});
				it('should render the check your answers page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/check-your-answers',
						mockPageData
					);
				});
			});
		});
	});
});
