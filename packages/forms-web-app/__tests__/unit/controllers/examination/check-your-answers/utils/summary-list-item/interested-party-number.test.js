const {
	getSummaryListItemInterestedPartyNumber
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/interested-party-number');

const {
	getDeadlineDetailsInterestedPartyNumber
} = require('../../../../../../../src/controllers/examination/session/deadline');
const {
	getSummaryListItem
} = require('../../../../../../../src/controllers/utils/get-summary-list-item');

jest.mock('../../../../../../../src/controllers/examination/session/deadline', () => ({
	getDeadlineDetailsInterestedPartyNumber: jest.fn()
}));
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/interested-party-number', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getSummaryListItemInterestedPartyNumber', () => {
		describe('When getting the interested party number summary list item for the check your answers page', () => {
			let result;
			const mockDeadlineInterestedPartyNumberValue = '1234567890';
			const mockSummaryListItem = {
				mockSummaryListItem: 'mock summary list item'
			};
			beforeEach(() => {
				getDeadlineDetailsInterestedPartyNumber.mockReturnValue(
					mockDeadlineInterestedPartyNumberValue
				);
				getSummaryListItem.mockReturnValue(mockSummaryListItem);
				result = getSummaryListItemInterestedPartyNumber(req.session);
			});
			it('should get the summary list item with the interested party number title and value', () => {
				expect(getSummaryListItem).toHaveBeenCalledWith(
					'Interested party number',
					mockDeadlineInterestedPartyNumberValue,
					'/examination/your-interested-party-number?mode=edit'
				);
			});
			it('should return a summary list item', () => {
				expect(result).toEqual(mockSummaryListItem);
			});
		});
	});
});
