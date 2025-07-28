const { getSummaryListItemSubmissionItems } = require('./submission-items');

const { getSubmissionItems } = require('../../../_session/submission-items-session');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { mockI18n } = require('../../../../_mocks/i18n');
const examinationTranslationsEN = require('../../../_translations/en.json');

const i18n = mockI18n({ examination: examinationTranslationsEN });

jest.mock('../../../_session/submission-items-session', () => ({
	getSubmissionItems: jest.fn()
}));
jest.mock('../../../../../controllers/utils/get-summary-list-item', () => ({
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
					result = getSummaryListItemSubmissionItems(i18n, req.session);
				});
				it('should get the summary list item with the submission items title and fotmatted value', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						i18n,
						'Deadline items added',
						'<ul class="govuk-list"><li>mock submission item 1</li><li>mock submission item 2</li></ul>',
						'add-another-deadline-item?mode=edit'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
