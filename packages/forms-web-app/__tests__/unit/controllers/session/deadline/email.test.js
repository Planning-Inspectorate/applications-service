const {
	getDeadlineEmail,
	setDeadlineEmail
} = require('../../../../../src/controllers/session/deadline/email');

const {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/email', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineEmail', () => {
		describe('When getting the deadline email from the examination session', () => {
			describe('and there is no deadline email in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineEmail()).toThrow('Deadline email not found');
				});
			});
			describe('and there is a deadline email in the examination session', () => {
				let result;
				const mockExaminationSession = {
					email: 'mock email'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineEmail(req.session);
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
	describe('#setDeadlineEmail', () => {
		describe('When setting the deadline email in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineEmail = 'mock deadline email';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineEmail(req.session, mockDeadlineEmail);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline email to the examination session', () => {
				expect(mockExaminationSession).toEqual({ email: mockDeadlineEmail });
			});
		});
	});
});
