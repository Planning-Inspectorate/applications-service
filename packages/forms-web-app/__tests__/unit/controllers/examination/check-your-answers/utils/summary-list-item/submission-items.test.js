const {
	getSummaryListItemSubmissionItems
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/submission-items');

const {
	getSubmissionItems
} = require('../../../../../../../src/controllers/examination/session/submission-items-session');
const {
	getSummaryListItem
} = require('../../../../../../../src/controllers/utils/get-summary-list-item');

jest.mock(
	'../../../../../../../src/controllers/examination/session/submission-items-session',
	() => ({
		getSubmissionItems: jest.fn()
	})
);
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/submission-items', () => {
	describe('#getSummaryListItemSubmissionItems', () => {
		const req = {
			session: { mockSession: 'mock session' }
		};
		const mockSubmissionItems = [
			{ submissionItem: 'mock submission item 1' },
			{ submissionItem: 'mock submission item 2' }
		];
		const mockSummaryListItem = {
			mockSummaryListItem: 'mock summary list item'
		};
		describe('When getting the submission items summary list item for the check your answers page', () => {
			describe('and there are submission items in the session', () => {
				let result;
				beforeEach(() => {
					getSubmissionItems.mockReturnValue(mockSubmissionItems);
					getSummaryListItem.mockReturnValue(mockSummaryListItem);
					result = getSummaryListItemSubmissionItems(req.session);
				});
				it('should get the summary list item with the submission items title and fotmatted value', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						'Deadline items added',
						'<ul class="govuk-list"><li>mock submission item 1</li><li>mock submission item 2</li></ul>',
						'/examination/add-another-deadline-item?mode=edit'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
