const {
	getDeadlineDetailsEmail,
	setDeadlineDetailsEmail
} = require('../../../../../../../src/controllers/examination/session/deadline/details/email');

const {
	getExaminationSession
} = require('../../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/deadline/details/email', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineDetailsEmail', () => {
		describe('When getting the deadline email from the examination session', () => {
			describe('and there is no deadline email in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineDetailsEmail()).toThrow('Deadline email not found');
				});
			});
			describe('and there is a deadline email in the examination session', () => {
				let result;
				const mockExaminationSession = {
					email: 'mock@email.com'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineDetailsEmail(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline email', () => {
					expect(result).toEqual(mockExaminationSession.email);
				});
			});
		});
	});
	describe('#setDeadlineDetailsEmail', () => {
		describe('When setting the deadline email in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineEmailValue = 'mock@email.com';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineDetailsEmail(req.session, mockDeadlineEmailValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline email to the examination session', () => {
				expect(mockExaminationSession).toEqual({ email: mockDeadlineEmailValue });
			});
		});
	});
});
