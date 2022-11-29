const {
	getSummaryListItemEmail
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/email');

const { getDeadlineEmail } = require('../../../../../../../src/controllers/session/deadline');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');

jest.mock('../../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineEmail: jest.fn()
}));
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item-with-html', () => ({
	getSummaryListItemWithHtml: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/email', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getSummaryListItemEmail', () => {
		describe('When getting the email summary list item for the check your answers page', () => {
			let result;
			const mockDeadlineEmail = 'mock deadline email';
			const mockSummaryListItemWithHtml = {
				mockSummaryListItemWithHtml: 'mock summary list item with html'
			};
			beforeEach(() => {
				getDeadlineEmail.mockReturnValue(mockDeadlineEmail);
				getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
				result = getSummaryListItemEmail(req.session);
			});
			it('should call the functions', () => {
				expect(getDeadlineEmail).toHaveBeenLastCalledWith(req.session);
				expect(getSummaryListItemWithHtml).toHaveBeenLastCalledWith(
					'Email Address',
					mockDeadlineEmail
				);
			});
			it('should return the email summary list item', () => {
				expect(result).toEqual(mockSummaryListItemWithHtml);
			});
		});
	});
});
