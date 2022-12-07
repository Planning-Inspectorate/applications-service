const {
	getDeadlineDetailsApplicant,
	setDeadlineDetailsApplicant
} = require('../../../../../../../src/controllers/examination/session/deadline/details/applicant');

const {
	getExaminationSession
} = require('../../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/deadline/details/applicant', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineDetailsApplicant', () => {
		describe('When getting the deadline applicant from the examination session', () => {
			describe('and there is no deadline applicant in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineDetailsApplicant()).toThrow('Deadline applicant not found');
				});
			});
			describe('and there is a deadline applicant in the examination session', () => {
				let result;
				const mockExaminationSession = {
					isApplicant: 'yes/no'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineDetailsApplicant(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline applicant value', () => {
					expect(result).toEqual(mockExaminationSession.isApplicant);
				});
			});
		});
	});
	describe('#setDeadlineDetailsApplicant', () => {
		describe('When setting the deadline applicant in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineApplicantValue = 'yes/no';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineDetailsApplicant(req.session, mockDeadlineApplicantValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline applicant to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					isApplicant: mockDeadlineApplicantValue
				});
			});
		});
	});
});
