const { getPageData } = require('./get-page-data');

const { getDeadlineTitle } = require('../../_session/deadline');
const { getSummaryListDetails } = require('./get-summary-list-details');
const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');

jest.mock('../../_session/deadline', () => ({
	getDeadlineTitle: jest.fn()
}));
jest.mock('./get-summary-list-details', () => ({
	getSummaryListDetails: jest.fn()
}));
jest.mock('./get-summary-list-submission-items', () => ({
	getSummaryListSubmissionItems: jest.fn()
}));

describe('examination/check-your-answers/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the check your answers page', () => {
			let result;
			const req = {
				session: { mockSession: 'mock session' }
			};
			const mockDeadlineTitle = 'mock deadline title';
			const mockSummaryListDetails = [
				{ mockSummaryListDetailItem: 'mock summary list detail item' }
			];
			const mockSummaryListSubmissionItems = [
				{
					mockSummaryListSubmissionItem: 'mock summary list submission item'
				}
			];
			beforeEach(() => {
				getDeadlineTitle.mockReturnValue(mockDeadlineTitle);
				getSummaryListDetails.mockReturnValue(mockSummaryListDetails);
				getSummaryListSubmissionItems.mockReturnValue(mockSummaryListSubmissionItems);
				result = getPageData(req.session);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'add-another-deadline-item',
					deadlineTitle: mockDeadlineTitle,
					nextPageUrl: 'process-submission',
					pageTitle: 'Check your answers',
					summaryListDetails: mockSummaryListDetails,
					summaryListDetailsTitle: 'Your details',
					summaryListSubmissionItems: mockSummaryListSubmissionItems,
					summaryListSubmissionItemsTitle: 'Your submissions',
					title: 'Check your answers'
				});
			});
		});
	});
});
