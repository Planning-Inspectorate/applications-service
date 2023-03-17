const { getDeadlineId, setDeadlineId } = require('./id');

const { getExaminationSession } = require('../examination-session');

jest.mock('../examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('examination/session/deadline/id', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineId', () => {
		describe('When getting the deadline id from the examination session', () => {
			describe('and there is no deadline id in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineId()).toThrow('Deadline id not found');
				});
			});
			describe('and there is a deadline id in the examination session', () => {
				let result;
				const mockExaminationSession = {
					id: 'ID-123-ABC'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineId(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline id', () => {
					expect(result).toEqual(mockExaminationSession.id);
				});
			});
		});
	});
	describe('#setDeadlineId', () => {
		describe('When setting the deadline id in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineIdValue = 'ID-123-ABC';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineId(req.session, mockDeadlineIdValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline id to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					id: mockDeadlineIdValue
				});
			});
		});
	});
});
