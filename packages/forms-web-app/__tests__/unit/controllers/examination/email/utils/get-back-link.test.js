const {
	getBackLink
} = require('../../../../../../src/controllers/examination/email/utils/get-back-link');
const {
	getExaminationSession
} = require('../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));
describe('#getBackLink', () => {
	describe('When getting the back link for the email controller', () => {
		describe('and if is query mode', () => {
			let result;
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ isApplicant: 'yes' });
				result = getBackLink({}, { mode: 'edit' });
			});
			it('should return the previous page', () => {
				expect(result).toEqual('/examination/check-your-answers');
			});
		});
		describe('and the user is the applicant', () => {
			let result;

			beforeEach(() => {
				getExaminationSession.mockReturnValue({ isApplicant: 'yes' });
				result = getBackLink();
			});
			it('should return the previous page', () => {
				expect(result).toEqual('/examination/are-you-applicant');
			});
		});
		describe('and the user is submitting for organisation', () => {
			let result;

			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submittingFor: 'organisation' });
				result = getBackLink();
			});
			it('should return the previous page', () => {
				expect(result).toEqual('/examination/your-organisation-name');
			});
		});
		describe('and the user is submitting for agent', () => {
			let result;

			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submittingFor: 'agent' });
				result = getBackLink();
			});
			it('should return the previous page', () => {
				expect(result).toEqual('/examination/name-of-person-or-group');
			});
		});
		describe('and the user is submitting for myself', () => {
			let result;

			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submittingFor: 'myself' });
				result = getBackLink();
			});
			it('should return the previous page', () => {
				expect(result).toEqual('/examination/your-name');
			});
		});
	});
});
