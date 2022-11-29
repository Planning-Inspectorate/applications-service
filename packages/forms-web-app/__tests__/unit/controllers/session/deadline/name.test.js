const {
	getDeadlineName,
	setDeadlineName
} = require('../../../../../src/controllers/session/deadline/name');

const {
	getExaminationSession
} = require('../../../../../src/controllers/session/examination-session');

jest.mock('../../../../../src/controllers/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/name', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineName', () => {
		describe('When getting the deadline name from the examination session', () => {
			describe('and there is no deadline name in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineName()).toThrow('Deadline name not found');
				});
			});
			describe('and there is a deadline name in the examination session', () => {
				let result;
				const mockExaminationSession = {
					name: 'mock name'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineName(req.session);
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
	describe('#setDeadlineName', () => {
		describe('When setting the deadline name in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineName = 'mock deadline name';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineName(req.session, mockDeadlineName);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline name to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					name: mockDeadlineName
				});
			});
		});
	});
});
