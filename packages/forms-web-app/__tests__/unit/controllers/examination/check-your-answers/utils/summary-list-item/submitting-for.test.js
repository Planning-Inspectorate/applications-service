const {
	getSummaryListItemSubmittingFor
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/submitting-for');

const {
	getDeadlineSubmittingFor
} = require('../../../../../../../src/controllers/session/deadline');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');
const {
	getSelectedOptionText
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/helpers');

jest.mock('../../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineSubmittingFor: jest.fn()
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
				const mockSubmittingFor = 'myself, organisation or agent';
				const mockSubmittingForText = 'mock submitting for text';
				const mockSummaryListItemWithHtml = {
					mockSummaryListItemWithHtml: 'mock summary list item with html'
				};
				beforeEach(() => {
					getDeadlineSubmittingFor.mockReturnValue(mockSubmittingFor);
					getSelectedOptionText.mockReturnValue(mockSubmittingForText);
					getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
					result = getSummaryListItemSubmittingFor(req.session);
				});
				it('should call the functions', () => {
					expect(getDeadlineSubmittingFor).toHaveBeenCalledWith(req.session);
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
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith(
						'Making submission for',
						mockSubmittingForText
					);
				});
				it('should return the submitting for summary list item', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
		});
	});
});
