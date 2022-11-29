const {
	getSummaryListItemInterestedPartyNumber
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/interested-party-number');

const {
	getDeadlineInterestedPartyNumber
} = require('../../../../../../../src/controllers/session/deadline');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');

jest.mock('../../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineInterestedPartyNumber: jest.fn()
}));
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item-with-html', () => ({
	getSummaryListItemWithHtml: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/interested-party-number', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getSummaryListItemInterestedPartyNumber', () => {
		describe('When getting the interested party number summary list item for the check your answers page', () => {
			let result;
			const mockDeadlineInterestedPartyNumber = 'mock interested party number';
			const mockSummaryListItemWithHtml = {
				mockSummaryListItemWithHtml: 'mock summary list item with html'
			};
			beforeEach(() => {
				getDeadlineInterestedPartyNumber.mockReturnValue(mockDeadlineInterestedPartyNumber);
				getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
				result = getSummaryListItemInterestedPartyNumber(req.session);
			});
			it('should call the functions', () => {
				expect(getDeadlineInterestedPartyNumber).toHaveBeenLastCalledWith(req.session);
				expect(getSummaryListItemWithHtml).toHaveBeenLastCalledWith(
					'Interested party number',
					mockDeadlineInterestedPartyNumber
				);
			});
			it('should return the interested party number summary list item', () => {
				expect(result).toEqual(mockSummaryListItemWithHtml);
			});
		});
	});
});
