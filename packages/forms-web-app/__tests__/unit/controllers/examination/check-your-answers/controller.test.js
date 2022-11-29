const {
	getCheckYourAnswers
} = require('../../../../../src/controllers/examination/check-your-answers/controller');

const {
	getPageData
} = require('../../../../../src/controllers/examination/check-your-answers/utils/get-page-data');
const {
	getSummaryListDetails
} = require('../../../../../src/controllers/examination/check-your-answers/utils/get-summary-list-details');
const {
	getSummaryListSubmissionItems
} = require('../../../../../src/controllers/examination/check-your-answers/utils/get-summary-list-submission-items');

jest.mock(
	'../../../../../src/controllers/examination/check-your-answers/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/check-your-answers/utils/get-summary-list-details',
	() => ({
		getSummaryListDetails: jest.fn()
	})
);
jest.mock(
	'../../../../../src/controllers/examination/check-your-answers/utils/get-summary-list-submission-items',
	() => ({
		getSummaryListSubmissionItems: jest.fn()
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
				const mockSummaryListDetails = { mockSummaryListDetails: 'mock summary list details' };
				const mockSummaryListSubmissionItems = {
					mockPageData: 'mock summary list submission items'
				};
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageData);
					getSummaryListDetails.mockReturnValue(mockSummaryListDetails);
					getSummaryListSubmissionItems.mockReturnValue(mockSummaryListSubmissionItems);
					getCheckYourAnswers(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toBeCalledWith(req.session);
					expect(getSummaryListDetails).toBeCalledWith(req.session);
					expect(getSummaryListSubmissionItems).toBeCalledWith(req.session);
				});
				it('should render the check your answers page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/check-your-answers', {
						...mockPageData,
						...mockSummaryListDetails,
						...mockSummaryListSubmissionItems
					});
				});
			});
		});
	});
});
