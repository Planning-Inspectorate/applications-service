const { getSummaryListItemSubmittingFor } = require('./submitting-for');

const { getDeadlineDetailsSubmittingFor } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');

jest.mock('../../../_session/deadline', () => ({
	getDeadlineDetailsSubmittingFor: jest.fn()
}));
jest.mock('../../../../../controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));
jest.mock('./helpers', () => ({
	getSelectedOptionText: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/summary-list-item/submitting-for', () => {
	describe('#getSummaryListItemSubmittingFor', () => {
		const req = {
			session: { mockSession: 'mock session' }
		};
		describe('When getting the submitting for summary list item for the check your answers page', () => {
			describe('and the submitting for value retrived from the session is NOT myself, organisation or agent', () => {
				it('should throw an error', () => {
					expect(() => getSummaryListItemSubmittingFor(req.session)).toThrowError(
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
					result = getSummaryListItemSubmittingFor(req.session);
				});
				it('should use the submitting for options to get the submitting for option text', () => {
					expect(getSelectedOptionText).toHaveBeenCalledWith(
						{
							1: { text: 'Myself', value: 'myself' },
							2: { text: 'An organisation I work for', value: 'organisation' },
							3: {
								text: 'On behalf of another person, a family group or another organisation I do not work for',
								value: 'agent'
							}
						},
						mockSubmittingFor
					);
				});
				it('should get the summary list item with the submitting for title and selected option text', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						'Making submission for',
						mockSubmittingForText,
						'/examination/who-are-you-submitting-for?mode=edit'
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
