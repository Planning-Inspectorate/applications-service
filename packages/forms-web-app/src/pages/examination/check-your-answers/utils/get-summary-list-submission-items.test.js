const { getSummaryListSubmissionItems } = require('./get-summary-list-submission-items');

const { getSummaryListItemSubmissionItems } = require('./summary-list-item');
const { mockI18n } = require('../../../_mocks/i18n');
const examinationTranslationsEN = require('../../_translations/en.json');

const i18n = mockI18n({ examination: examinationTranslationsEN });

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
				result = getSummaryListSubmissionItems(i18n, req.session);
			});
			it('should call the functions', () => {
				expect(getSummaryListItemSubmissionItems).toHaveBeenLastCalledWith(i18n, req.session);
			});
			it('should return a summary list of submission items', () => {
				expect(result).toEqual([mockSummaryListItemSubmissionItems]);
			});
		});
	});
});
