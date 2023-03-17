const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');

const { getSummaryListItemSubmissionItems } = require('./summary-list-item');

jest.mock('./summary-list-item', () => ({
	getSummaryListItemSubmissionItems: jest.fn()
}));

describe('examination/check-your-answers/utils/get-summary-list-submission-items', () => {
	describe('#getSummaryListSubmissionItems', () => {
		describe('When getting the summary list of submission items for the check your answers page', () => {
			let result;
			const req = {
				session: { mockSession: 'mock session' }
			};
			const mockSummaryListItemSubmissionItems = { mockSubmissionItems: 'mock submission items' };
			beforeEach(() => {
				getSummaryListItemSubmissionItems.mockReturnValue(mockSummaryListItemSubmissionItems);
				result = getSummaryListSubmissionItems(req.session);
			});
			it('should call the functions', () => {
				expect(getSummaryListItemSubmissionItems).toHaveBeenLastCalledWith(req.session);
			});
			it('should return a summary list of submission items', () => {
				expect(result).toEqual([mockSummaryListItemSubmissionItems]);
			});
		});
	});
});
