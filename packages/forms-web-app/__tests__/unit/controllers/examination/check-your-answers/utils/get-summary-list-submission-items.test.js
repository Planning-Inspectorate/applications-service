const {
	getSummaryListSubmissionItems
} = require('../../../../../../src/controllers/examination/check-your-answers/utils/get-summary-list-submission-items');

const {
	getSummaryListItemSubmissionItems
} = require('../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item');

jest.mock(
	'../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item',
	() => ({
		getSummaryListItemSubmissionItems: jest.fn()
	})
);

describe('controllers/examination/check-your-answers/utils/get-summary-list-submission-items', () => {
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
				expect(result).toEqual({
					summaryListSubmissionItems: [mockSummaryListItemSubmissionItems]
				});
			});
		});
	});
});
