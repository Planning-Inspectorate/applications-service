const { getSummaryListItemSubmittingFor } = require('./submitting-for');

const { getDeadlineDetailsSubmittingFor } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const { mockI18n } = require('../../../../_mocks/i18n');
const examinationTranslations__EN = require('../../../_translations/en.json');

jest.mock('../../../_session/deadline', () => ({
	getDeadlineDetailsSubmittingFor: jest.fn()
}));
jest.mock('../../../../../controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));
jest.mock('./helpers', () => ({
	getSelectedOptionText: jest.fn()
}));

const i18n = mockI18n({
	examination: examinationTranslations__EN
});

describe('pages/examination/check-your-answers/utils/summary-list-item/submitting-for', () => {
	describe('#getSummaryListItemSubmittingFor', () => {
		const req = {
			i18n,
			session: { mockSession: 'mock session' }
		};
		describe('When getting the submitting for summary list item for the check your answers page', () => {
			describe('and the submitting for value retrived from the session is NOT myself, organisation or agent', () => {
				it('should throw an error', () => {
					expect(() => getSummaryListItemSubmittingFor(req.i18n, req.session)).toThrowError(
						'Submitting for text is undefined'
					);
				});
			});

			describe('and the submitting for value retrived from the session is myself, organisation or agent', () => {
				let result;
				const mockSubmittingFor = 'myself/organisation/agent';
				const mockSubmittingForText = 'mock submitting for text';
				const mockSummaryListItem = {
					mockSummaryListItem: 'mock summary list item'
				};
				beforeEach(() => {
					getDeadlineDetailsSubmittingFor.mockReturnValue(mockSubmittingFor);
					getSelectedOptionText.mockReturnValue(mockSubmittingForText);
					getSummaryListItem.mockReturnValue(mockSummaryListItem);
					result = getSummaryListItemSubmittingFor(req.i18n, req.session);
				});
				it('should use the submitting for options to get the submitting for option text', () => {
					expect(getSelectedOptionText).toHaveBeenCalledWith(
						{
							1: { text: 'Myself', value: 'myself' },
							2: { text: 'An organisation I work for', value: 'organisation' },
							3: {
								text: 'On behalf of another person, a household or another organisation I do not work for',
								value: 'agent'
							}
						},
						mockSubmittingFor
					);
				});
				it('should get the summary list item with the submitting for title and selected option text', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						req.i18n,
						'Making submission for',
						mockSubmittingForText,
						'who-are-you-submitting-for?mode=edit'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
