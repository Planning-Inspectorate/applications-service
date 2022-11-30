const {
	getDeadlineTitle,
	setDeadlineTitle
} = require('../../../../../src/controllers/session/deadline/title');

const {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/title', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineTitle', () => {
		describe('When getting the deadline title from the examination session', () => {
			describe('and there is no deadline title in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineTitle()).toThrow('Deadline title not found');
				});
			});
			describe('and there is a deadline title in the examination session', () => {
				let result;
				const mockExaminationSession = {
					title: 'mock title'
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineTitle(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline title', () => {
					expect(result).toEqual(mockExaminationSession.title);
				});
			});
		});
	});
	describe('#setDeadlineTitle', () => {
		describe('When setting the deadline title in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineTitle = 'mock deadline title';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineTitle(req.session, mockDeadlineTitle);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline title to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					title: mockDeadlineTitle
				});
			});
		});
	});
});
