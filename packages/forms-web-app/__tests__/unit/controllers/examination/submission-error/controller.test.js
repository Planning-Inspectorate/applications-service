const {
	getSubmissionError
} = require('../../../../../src/controllers/examination/submission-error/controller');

const {
	getPageData
} = require('../../../../../src/controllers/examination/submission-error/utils/get-page-data');

jest.mock(
	'../../../../../src/controllers/examination/submission-error/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);

describe('controllers/examination/submission-error/controller', () => {
	describe('#getSubmissionError', () => {
		describe('When getting the submission error page', () => {
			const req = {
				session: { text: 'mock session' },
				query: { text: 'mock query' }
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			describe('and there are no errors', () => {
				const mockPageDataValue = { text: 'mock page data' };
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageDataValue);
					getSubmissionError(req, res);
				});
				it('should return the page template and page data', () => {
					expect(res.render).toHaveBeenCalledWith(
						'pages/examination/submission-error',
						mockPageDataValue
					);
				});
			});
			describe('and an error is thrown', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('something went wrong');
					});
					getSubmissionError(req, res);
				});
				it('should render the Error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
		});
		describe('and there are errors', () => {
			const req = {
				body: {},
				session: { text: 'mock session' },
				query: { text: 'mock query' }
			};
			const res = {
				render: jest.fn(),
				status: jest.fn(() => res)
			};
			beforeEach(() => {
				getPageData.mockImplementation(() => {
					throw new Error('something went wrong');
				});
				getSubmissionError(req, res);
			});
			it('should render the Error page', () => {
				expect(res.status).toHaveBeenCalledWith(500);
				expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
			});
		});
	});
});
