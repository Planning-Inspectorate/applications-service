const { getPageData } = require('./get-page-data');

const { getSummaryListDetails } = require('./get-summary-list-details');
const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');
const { mockI18n } = require('../../../_mocks/i18n');
const examinationTranslationsEN = require('../../_translations/en.json');

const i18n = mockI18n({ examination: examinationTranslationsEN });

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
				session: { examination: { title: 'mock deadline title' }, mockSession: 'mock session' }
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
				getSummaryListDetails.mockReturnValue(mockSummaryListDetails);
				getSummaryListSubmissionItems.mockReturnValue(mockSummaryListSubmissionItems);
				result = getPageData(i18n, req.session);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'add-another-deadline-item',
					deadlineTitle: mockDeadlineTitle,
					nextPageUrl: 'process-submission',
					summaryListDetails: mockSummaryListDetails,
					summaryListSubmissionItems: mockSummaryListSubmissionItems
				});
			});
		});
	});
});
