const {
	getSummaryListItemSubmissionItems
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/submission-items');

const {
	getSubmissionItems
} = require('../../../../../../../src/controllers/examination/session/submission-items-session');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');

jest.mock(
	'../../../../../../../src/controllers/examination/session/submission-items-session',
	() => ({
		getSubmissionItems: jest.fn()
	})
);
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item-with-html', () => ({
	getSummaryListItemWithHtml: jest.fn()
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
		const mockSummaryListItemWithHtml = {
			mockSummaryListItemWithHtml: 'mock summary list item with html'
		};
		describe('When getting the submission items summary list item for the check your answers page', () => {
			describe('and there are submission items in the session', () => {
				let result;
				beforeEach(() => {
					getSubmissionItems.mockReturnValue(mockSubmissionItems);
					getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
					result = getSummaryListItemSubmissionItems(req.session);
				});
				it('should call the functions', () => {
					expect(getSubmissionItems).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith(
						'Deadline items added',
						'<ul class="govuk-list"><li>mock submission item 1</li><li>mock submission item 2</li></ul>'
					);
				});
				it('should return the submission items summary list', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
		});
	});
});
