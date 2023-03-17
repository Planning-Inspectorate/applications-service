const { getBackLinkUrl } = require('./get-back-link-url');

const { getExaminationApplicantValue } = require('../../_session/deadline/details/applicant');
const { getUserHasInterestedPartyNumber } = require('../../_session/deadline/helpers');
const { isQueryModeEdit } = require('../../../../controllers/utils/is-query-mode-edit');

jest.mock('../../_session/deadline/details/applicant', () => ({
	getExaminationApplicantValue: jest.fn()
}));
jest.mock('../../_session/deadline/helpers', () => ({
	getUserHasInterestedPartyNumber: jest.fn()
}));
jest.mock('../../../../controllers/utils/is-query-mode-edit', () => ({
	isQueryModeEdit: jest.fn()
}));

describe('examination/submitting-for/utils/get-back-link-url', () => {
	describe('#getBackLinkUrl', () => {
		beforeEach(() => {
			isQueryModeEdit.mockReturnValue(false);
			getUserHasInterestedPartyNumber.mockReturnValue(false);
			getExaminationApplicantValue.mockReturnValue(false);
		});
		describe('When getting the back link URL for the submitting for page', () => {
			describe('and the mode is edit', () => {
				let result;
				beforeEach(() => {
					isQueryModeEdit.mockReturnValue(true);
					result = getBackLinkUrl();
				});
				it('should return the check your answers URL', () => {
					expect(result).toEqual('/examination/check-your-answers');
				});
			});
			describe('and the user has previously selected that they have an interested party number', () => {
				let result;
				beforeEach(() => {
					getUserHasInterestedPartyNumber.mockReturnValue(true);
					result = getBackLinkUrl();
				});
				it('should return the interested party number URL', () => {
					expect(result).toEqual('/examination/your-interested-party-number');
				});
			});
			describe('and the user has previously selected that they are not the applicant', () => {
				let result;
				beforeEach(() => {
					getExaminationApplicantValue.mockReturnValue('no');
					result = getBackLinkUrl();
				});
				it('should return the aare you the applicant URL', () => {
					expect(result).toEqual('/examination/are-you-applicant');
				});
			});
			describe('and there is no back link URL created', () => {
				it('should throw an error', () => {
					expect(() => getBackLinkUrl()).toThrow(
						'Submitting for page back link URL can not be set'
					);
				});
			});
		});
	});
});
