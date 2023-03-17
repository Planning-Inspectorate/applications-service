const { getDeadlineCaseRef, setDeadlineCaseRef } = require('./case-ref');

const { getExaminationSession } = require('../examination-session');

jest.mock('../examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/deadline/case-ref', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineCaseRef', () => {
		describe('When getting the deadline case reference from the examination session', () => {
			describe('and there is no deadline case reference in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineCaseRef()).toThrow('Deadline case ref not found');
				});
			});
			describe('and there is a deadline case reference in the examination session', () => {
				let result;
				const mockExaminationSession = {
					caseRef: 'ABC123'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineCaseRef(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline case reference', () => {
					expect(result).toEqual(mockExaminationSession.caseRef);
				});
			});
		});
	});
	describe('#setDeadlineCaseRef', () => {
		describe('When setting the deadline case reference in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineCaseRefValue = 'ABC123';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineCaseRef(req.session, mockDeadlineCaseRefValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline case reference to the examination session', () => {
				expect(mockExaminationSession).toEqual({ caseRef: mockDeadlineCaseRefValue });
			});
		});
	});
});
