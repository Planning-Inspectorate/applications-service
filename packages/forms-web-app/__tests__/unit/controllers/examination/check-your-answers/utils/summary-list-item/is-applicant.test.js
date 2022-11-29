const {
	getSummaryListIsApplicant
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/is-applicant');

const { getDeadlineIsApplicant } = require('../../../../../../../src/controllers/session/deadline');
const {
	getSummaryListItemWithHtml
} = require('../../../../../../../src/controllers/utils/get-summary-list-item-with-html');
const {
	getSelectedOptionText
} = require('../../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item/helpers');

jest.mock('../../../../../../../src/controllers/session/deadline', () => ({
	getDeadlineIsApplicant: jest.fn()
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

describe('controllers/examination/check-your-answers/utils/summary-list-item/is-applicant', () => {
	describe('#getSummaryListIsApplicant', () => {
		const req = {
			session: { mockSession: 'mock session' }
		};
		describe('When getting the is applicant summary list item for the check your answers page', () => {
			describe('and the is applicant value retrived from the session does NOT match yes or no', () => {
				it('should throw an error', () => {
					expect(() => getSummaryListIsApplicant(req.session)).toThrowError(
						'Applicant text is undefined'
					);
				});
			});
			describe('and the is applicant value retrived from the session does match yes or no', () => {
				let result;
				const mockIsApplicant = 'mock is applicant';
				const mockIsApplicantText = 'mock is applicant text';
				const mockSummaryListItemWithHtml = {
					mockSummaryListItemWithHtml: 'mock summary list item with html'
				};
				beforeEach(() => {
					getDeadlineIsApplicant.mockReturnValue(mockIsApplicant);
					getSelectedOptionText.mockReturnValue(mockIsApplicantText);
					getSummaryListItemWithHtml.mockReturnValue(mockSummaryListItemWithHtml);
					result = getSummaryListIsApplicant(req.session);
				});
				it('should call the functions', () => {
					expect(getDeadlineIsApplicant).toHaveBeenCalledWith(req.session);
					expect(getSelectedOptionText).toHaveBeenCalledWith(
						{
							1: { text: 'Yes', value: 'yes' },
							2: { text: 'No', value: 'no' }
						},
						mockIsApplicant
					);
					expect(getSummaryListItemWithHtml).toHaveBeenCalledWith(
						'Applicant or not',
						mockIsApplicantText
					);
				});
				it('should return the is applicant summary list item', () => {
					expect(result).toEqual(mockSummaryListItemWithHtml);
				});
			});
		});
	});
});
