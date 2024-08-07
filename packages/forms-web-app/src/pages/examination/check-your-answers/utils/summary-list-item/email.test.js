const { getSummaryListItemEmail } = require('./email');

const { getDeadlineDetailsEmail } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { mockI18n } = require('../../../../_mocks/i18n');
const examinationTranslationsEN = require('../../../_translations/en.json');

const i18n = mockI18n({ examination: examinationTranslationsEN });

jest.mock('../../../_session/deadline', () => ({
	getDeadlineDetailsEmail: jest.fn()
}));
jest.mock('../../../../../controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));

describe('examination/check-your-answers/utils/summary-list-item/email', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getSummaryListItemEmail', () => {
		describe('When getting the email summary list item for the check your answers page', () => {
			let result;
			const mockDeadlineEmailValue = 'mock@email.com';
			const mockSummaryListItem = {
				mockSummaryListItem: 'mock summary list item'
			};
			beforeEach(() => {
				getDeadlineDetailsEmail.mockReturnValue(mockDeadlineEmailValue);
				getSummaryListItem.mockReturnValue(mockSummaryListItem);
				result = getSummaryListItemEmail(i18n, req.session);
			});
			it('should get the summary list item with the email address title and value', () => {
				expect(getSummaryListItem).toHaveBeenCalledWith(
					i18n,
					'Email Address',
					mockDeadlineEmailValue,
					'your-email-address?mode=edit'
				);
			});
			it('should return the summary list', () => {
				expect(result).toEqual(mockSummaryListItem);
			});
		});
	});
});
