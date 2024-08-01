const { getSummaryListItemHasInterestedPartyNumber } = require('./has-interested-party-number');

const { getDeadlineDetailsHasInterestedPartyNumber } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../../locales/en/common.json');
const examinationTranslationsEN = require('../../../_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	examination: examinationTranslationsEN
});

jest.mock('../../../_session/deadline', () => ({
	getDeadlineDetailsHasInterestedPartyNumber: jest.fn()
}));
jest.mock('../../../../../controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));
jest.mock('./helpers', () => ({
	getSelectedOptionText: jest.fn()
}));

describe('examination/check-your-answers/utils/summary-list-item/has-interested-party-number', () => {
	describe('#getSummaryListItemHasInterestedPartyNumber', () => {
		const req = {
			session: { mockSession: 'mock session' },
			i18n
		};
		describe('When getting the has interested party number summary list item for the check your answers page', () => {
			describe('and the has interested party number retrived from the session is NOT yes or no', () => {
				it('should throw an error', () => {
					expect(() =>
						getSummaryListItemHasInterestedPartyNumber(req.i18n, req.session)
					).toThrowError('Has interested party number text is undefined');
				});
			});
			describe('and the has interested party number retrived from the session is yes or no', () => {
				let result;
				const mockHasInterestedPartyNumber = 'yes/no';
				const mockHasInterestedPartyNumberText = 'Yes/No';
				const mockSummaryListItem = {
					mockSummaryListItem: 'mock summary list item'
				};
				beforeEach(() => {
					getDeadlineDetailsHasInterestedPartyNumber.mockReturnValue(mockHasInterestedPartyNumber);
					getSelectedOptionText.mockReturnValue(mockHasInterestedPartyNumberText);
					getSummaryListItem.mockReturnValue(mockSummaryListItem);
					result = getSummaryListItemHasInterestedPartyNumber(req.i18n, req.session);
				});
				it('should use the has interested party number options to get the has interested party number option text', () => {
					expect(getSelectedOptionText).toHaveBeenCalledWith(
						{
							1: { text: 'Yes', value: 'yes' },
							2: { text: 'No', value: 'no' }
						},
						mockHasInterestedPartyNumber
					);
				});
				it('should get the summary list item with the has interested party number title and selected option text', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						req.i18n,
						'Interested party reference number available',
						mockHasInterestedPartyNumberText
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
