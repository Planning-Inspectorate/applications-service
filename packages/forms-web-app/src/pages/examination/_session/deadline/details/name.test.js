const { getDeadlineDetailsName, setDeadlineDetailsName } = require('./name');

const { getExaminationSession } = require('../../examination-session');

jest.mock('../../examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('examination/session/deadline/details/name', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineDetailsName', () => {
		describe('When getting the deadline name from the examination session', () => {
			describe('and there is no deadline name in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineDetailsName()).toThrow('Deadline name not found');
				});
			});
			describe('and there is a deadline name in the examination session', () => {
				let result;
				const mockExaminationSession = {
					name: 'mock name'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineDetailsName(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline name', () => {
					expect(result).toEqual(mockExaminationSession.name);
				});
			});
		});
	});
	describe('#setDeadlineDetailsName', () => {
		describe('When setting the deadline name in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineNameValue = 'mock name';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineDetailsName(req.session, mockDeadlineNameValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline name to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					name: mockDeadlineNameValue
				});
			});
		});
	});
});
