const {
	getDeadlineIsApplicant,
	setDeadlineIsApplicant
} = require('../../../../../src/controllers/session/deadline/is-applicant');

const {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/is-applicant', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineIsApplicant', () => {
		describe('When getting the deadline is applicant from the examination session', () => {
			describe('and there is no deadline is applicant in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineIsApplicant()).toThrow('Deadline is applicant not found');
				});
			});
			describe('and there is a deadline is applicant in the examination session', () => {
				let result;
				const mockExaminationSession = {
					isApplicant: 'mock is applicant'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineIsApplicant(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline is applicant', () => {
					expect(result).toEqual(mockExaminationSession.isApplicant);
				});
			});
		});
	});
	describe('#setDeadlineIsApplicant', () => {
		describe('When setting the deadline is applicant in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineIsApplicant = 'mock deadline is applicant';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineIsApplicant(req.session, mockDeadlineIsApplicant);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline is applicant to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					isApplicant: mockDeadlineIsApplicant
				});
			});
		});
	});
});
