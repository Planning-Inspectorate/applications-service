const { getSummaryListDetails } = require('./get-summary-list-details');

const {
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListApplicant,
	getSummaryListName,
	getSummaryListItemEmail
} = require('./summary-list-item');
const {
	getUserHasInterestedPartyNumber,
	isUserApplicant
} = require('../../_session/deadline/helpers');
const { mockI18n } = require('../../../_mocks/i18n');
const commonTranslations_EN = require('../../../../locales/en/common.json');
const examinationTranslationsEN = require('../../_translations/en.json');

const i18n = mockI18n({
	common: commonTranslations_EN,
	examination: examinationTranslationsEN
});

jest.mock('./summary-list-item', () => ({
	getSummaryListItemHasInterestedPartyNumber: jest.fn(),
	getSummaryListItemInterestedPartyNumber: jest.fn(),
	getSummaryListItemSubmittingFor: jest.fn(),
	getSummaryListApplicant: jest.fn(),
	getSummaryListName: jest.fn(),
	getSummaryListItemEmail: jest.fn()
}));
jest.mock('../../_session/deadline/helpers', () => ({
	getUserHasInterestedPartyNumber: jest.fn(),
	isUserApplicant: jest.fn()
}));

describe('pages/examination/check-your-answers/utils/get-summary-list-details', () => {
	describe('#getSummaryListDetails', () => {
		const req = {
			session: { mockSession: 'mock session' },
			i18n
		};
		const mockSummaryListItemHasInterestedPartyNumber = {
			mockHasInterestedPartyNumber: 'mock has interested party number'
		};
		const mockSummaryListItemInterestedPartyNumber = {
			mockInterestedPartyNumber: 'mock interested party number'
		};
		const mockSummaryListItemSubmittingFor = { mockSubmittingFor: 'mock submitting for' };
		const mockSummaryListItemIsApplicant = { mockIsApplicant: 'mock is applicant' };
		const mockSummaryListName = { mockName: 'mock name' };
		const mockSummaryListEmail = { mockEmail: 'mock email' };

		describe('When getting the summary list details for the check your answers page', () => {
			beforeEach(() => {
				getSummaryListItemHasInterestedPartyNumber.mockReturnValue(
					mockSummaryListItemHasInterestedPartyNumber
				);
				getSummaryListItemInterestedPartyNumber.mockReturnValue(
					mockSummaryListItemInterestedPartyNumber
				);
				getSummaryListItemSubmittingFor.mockReturnValue(mockSummaryListItemSubmittingFor);
				getSummaryListApplicant.mockReturnValue(mockSummaryListItemIsApplicant);
				getSummaryListName.mockReturnValue(mockSummaryListName);
				getSummaryListItemEmail.mockReturnValue(mockSummaryListEmail);
			});
			describe('and the user has an interested party number and is not the applicant', () => {
				let result;
				beforeEach(() => {
					getUserHasInterestedPartyNumber.mockReturnValue(true);
					isUserApplicant.mockReturnValue(false);
					result = getSummaryListDetails(req.i18n, req.session);
				});
				it('should call the functions', () => {
					expect(getSummaryListItemHasInterestedPartyNumber).toHaveBeenCalledWith(
						req.i18n,
						req.session
					);
					expect(getSummaryListItemInterestedPartyNumber).toHaveBeenCalledWith(
						req.i18n,
						req.session
					);
					expect(getSummaryListItemSubmittingFor).toHaveBeenCalledWith(req.i18n, req.session);
					expect(getSummaryListName).toHaveBeenCalledWith(req.i18n, req.session);
					expect(getSummaryListItemEmail).toHaveBeenCalledWith(req.i18n, req.session);
				});
				it('should return the summary list items', () => {
					expect(result).toEqual([
						mockSummaryListItemHasInterestedPartyNumber,
						mockSummaryListItemInterestedPartyNumber,
						mockSummaryListItemSubmittingFor,
						mockSummaryListName,
						mockSummaryListEmail
					]);
				});
			});
			describe('and the user does not have an interested party number and is the applicant', () => {
				let result;
				beforeEach(() => {
					getUserHasInterestedPartyNumber.mockReturnValue(false);
					isUserApplicant.mockReturnValue(true);
					result = getSummaryListDetails(req.i18n, req.session);
				});
				it('should call the functions', () => {
					expect(getSummaryListItemHasInterestedPartyNumber).toHaveBeenCalledWith(
						req.i18n,
						req.session
					);
					expect(getSummaryListApplicant).toHaveBeenCalledWith(req.i18n, req.session);
					expect(getSummaryListItemEmail).toHaveBeenCalledWith(req.i18n, req.session);
				});
				it('should return the summary list items', () => {
					expect(result).toEqual([
						mockSummaryListItemHasInterestedPartyNumber,
						mockSummaryListItemIsApplicant,
						mockSummaryListEmail
					]);
				});
			});
		});
	});
});
