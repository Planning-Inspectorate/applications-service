const { getSummaryListApplicant } = require('./applicant');

const { getDeadlineDetailsApplicant } = require('../../../_session/deadline');
const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSelectedOptionText } = require('./helpers');
const { mockI18n } = require('../../../../_mocks/i18n');
const commonTranslationsEN = require('../../../../../locales/en/common.json');
const examinationTranslationsEN = require('../../../_translations/en.json');

jest.mock('../../../_session/deadline', () => ({
	getDeadlineDetailsApplicant: jest.fn()
}));
jest.mock('../../../../../controllers/utils/get-summary-list-item', () => ({
	getSummaryListItem: jest.fn()
}));
jest.mock('./helpers', () => ({
	getSelectedOptionText: jest.fn()
}));

const i18n = mockI18n({
	common: commonTranslationsEN,
	examination: examinationTranslationsEN
});

describe('pages/examination/check-your-answers/utils/summary-list-item/applicant', () => {
	describe('#getSummaryListApplicant', () => {
		const req = {
			i18n,
			session: { mockSession: 'mock session' }
		};
		describe('When getting the applicant summary list item for the check your answers page', () => {
			describe('and the applicant value retrived from the session is NOT yes or no', () => {
				it('should throw an error', () => {
					expect(() => getSummaryListApplicant(req.i18n, req.session)).toThrowError(
						'Applicant text is undefined'
					);
				});
			});
			describe('and the applicant value retrived from the session is yes or no', () => {
				let result;
				const mockApplicant = 'yes/no';
				const mockApplicantText = 'Yes/No';
				const mockSummaryListItem = {
					mockSummaryListItem: 'mock summary list item'
				};
				beforeEach(() => {
					getDeadlineDetailsApplicant.mockReturnValue(mockApplicant);
					getSelectedOptionText.mockReturnValue(mockApplicantText);
					getSummaryListItem.mockReturnValue(mockSummaryListItem);
					result = getSummaryListApplicant(req.i18n, req.session);
				});
				it('should use the applicant options to get the applicant option text', () => {
					expect(getSelectedOptionText).toHaveBeenCalledWith(
						{
							1: { text: 'Yes', value: 'yes' },
							2: { text: 'No', value: 'no' }
						},
						mockApplicant
					);
				});
				it('should get the summary list item with the applicant title and selected option text', () => {
					expect(getSummaryListItem).toHaveBeenCalledWith(
						req.i18n,
						'Applicant or not',
						mockApplicantText
					);
				});
				it('should return a summary list item', () => {
					expect(result).toEqual(mockSummaryListItem);
				});
			});
		});
	});
});
