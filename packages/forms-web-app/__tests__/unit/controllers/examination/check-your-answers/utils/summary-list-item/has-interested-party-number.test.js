const {
	getSummaryListItemHasInterestedPartyNumber
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/has-interested-party-number');

const {
	getDeadlineHasInterestedPartyNumber
} = require('../../../../../../../src/controllers/session/deadline');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');
const {
	getSelectedOptionText
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/helpers');

jest.mock('../../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineHasInterestedPartyNumber: jest.fn()
}));
jest.mock('../../../../../../../src/controllers/utils/get-summary-list-item-with-html', () => ({
	getSummaryListItemWithHtml: jest.fn()
}));
jest.mock(
	'../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/helpers',
	() => ({
		getSelectedOptionText: jest.fn()
	})
);

describe('controllers/examination/check-your-answers/utils/summary-list-item/has-interested-party-number', () => {
	describe('#getSummaryListItemHasInterestedPartyNumber', () => {
		const req = {
			session: { mockSession: 'mock session' }
		};
		describe('When getting the has interested party number summary list item for the check your answers page', () => {
			describe('and the has interested party number retrived from the session is NOT yes or no', () => {
				it('should throw an error', () => {
					expect(() => getSummaryListItemHasInterestedPartyNumber(req.session)).toThrowError(
						'Has interested party number text is undefined'
					);
				});
			});
			describe('and the has interested party number retrived from the session is yes or no', () => {
				let result;
				const mockHasInterestedPartyNumber = 'yes or no';
				const mockHasInterestedPartyNumberText = 'mock has interested party number text';
				const mockSummaryListItemWithHtml = {
					mockSummaryListItemWithHtml: 'mock summary list item with html'
				};
				beforeEach(() => {
					getDeadlineHasInterestedPartyNumber.mockReturnValue(mockHasInterestedPartyNumber);
					getSelectedOptionText.mockReturnValue(mockHasInterestedPartyNumberText);
					getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
					result = getSummaryListItemHasInterestedPartyNumber(req.session);
				});
				it('should call the functions', () => {
					expect(getDeadlineHasInterestedPartyNumber).toHaveBeenCalledWith(req.session);
					expect(getSelectedOptionText).toHaveBeenCalledWith(
						{
							1: { text: 'Yes', value: 'yes' },
							2: { text: 'No', value: 'no' }
						},
						mockHasInterestedPartyNumber
					);
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith(
						'Interested party number available',
						mockHasInterestedPartyNumberText
					);
				});
				it('should return the has interested party number summary list item', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
		});
	});
});
