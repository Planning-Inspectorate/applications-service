const {
	getSummaryListDetails
} = require('../../../../../../src/controllers/examination/check-your-answers/utils/get-summary-list-details');

const {
	getSummaryListItemHasInterestedPartyNumber,
	getSummaryListItemInterestedPartyNumber,
	getSummaryListItemSubmittingFor,
	getSummaryListIsApplicant,
	getSummaryListName,
	getSummaryListItemEmail
} = require('../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item');
const {
	getUserHasInterestedPartyNumber,
	getUserIsApplicant
} = require('../../../../../../src/controllers/session/deadline/helpers');

jest.mock(
	'../../../../../../src/controllers/examination/check-your-answers/utils/summary-list-item',
	() => ({
		getSummaryListItemHasInterestedPartyNumber: jest.fn(),
		getSummaryListItemInterestedPartyNumber: jest.fn(),
		getSummaryListItemSubmittingFor: jest.fn(),
		getSummaryListIsApplicant: jest.fn(),
		getSummaryListName: jest.fn(),
		getSummaryListItemEmail: jest.fn()
	})
);
jest.mock('../../../../../../src/controllers/session/deadline/helpers', () => ({
	getUserHasInterestedPartyNumber: jest.fn(),
	getUserIsApplicant: jest.fn()
}));

describe('controllers/examination/check-your-answers/utils/get-summary-list-details', () => {
	describe('#getSummaryListDetails', () => {
		const req = {
			session: { mockSession: 'mock session' }
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
				getSummaryListIsApplicant.mockReturnValue(mockSummaryListItemIsApplicant);
				getSummaryListName.mockReturnValue(mockSummaryListName);
				getSummaryListItemEmail.mockReturnValue(mockSummaryListEmail);
			});
			describe('and the user has an interested party number and is not the applicant', () => {
				let result;
				beforeEach(() => {
					getUserHasInterestedPartyNumber.mockReturnValue(true);
					getUserIsApplicant.mockReturnValue(false);
					result = getSummaryListDetails(req.session);
				});
				it('should call the functions', () => {
					expect(getSummaryListItemHasInterestedPartyNumber).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemInterestedPartyNumber).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemSubmittingFor).toHaveBeenCalledWith(req.session);
					expect(getSummaryListName).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemEmail).toHaveBeenCalledWith(req.session);
				});
				it('should return the summary list items', () => {
					expect(result).toEqual({
						summaryListDetails: [
							mockSummaryListItemHasInterestedPartyNumber,
							mockSummaryListItemInterestedPartyNumber,
							mockSummaryListItemSubmittingFor,
							mockSummaryListName,
							mockSummaryListEmail
						]
					});
				});
			});
			describe('and the user does not have an interested party number and is the applicant', () => {
				let result;
				beforeEach(() => {
					getUserHasInterestedPartyNumber.mockReturnValue(false);
					getUserIsApplicant.mockReturnValue(true);
					result = getSummaryListDetails(req.session);
				});
				it('should call the functions', () => {
					expect(getSummaryListItemHasInterestedPartyNumber).toHaveBeenCalledWith(req.session);
					expect(getSummaryListIsApplicant).toHaveBeenCalledWith(req.session);
					expect(getSummaryListItemEmail).toHaveBeenCalledWith(req.session);
				});
				it('should return the summary list items', () => {
					expect(result).toEqual({
						summaryListDetails: [
							mockSummaryListItemHasInterestedPartyNumber,
							mockSummaryListItemIsApplicant,
							mockSummaryListEmail
						]
					});
				});
			});
		});
	});
});
