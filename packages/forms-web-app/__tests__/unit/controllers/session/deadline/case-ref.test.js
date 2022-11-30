const {
	getDeadlineCaseRef,
	setDeadlineCaseRef
} = require('../../../../../src/controllers/session/deadline/case-ref');

const {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/case-ref', () => {
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
					caseRef: 'mock case reference'
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
			const mockDeadlineCaseRef = 'mock deadline case reference';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineCaseRef(req.session, mockDeadlineCaseRef);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline case reference to the examination session', () => {
				expect(mockExaminationSession).toEqual({ caseRef: mockDeadlineCaseRef });
			});
		});
	});
});
