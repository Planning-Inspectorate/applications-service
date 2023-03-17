const { getDeadlineTitle, setDeadlineTitle } = require('./title');

const { getExaminationSession } = require('../examination-session');

jest.mock('../examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('session/deadline/title', () => {
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
			const mockDeadlineTitleValue = 'mock title';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineTitle(req.session, mockDeadlineTitleValue);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline title to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					title: mockDeadlineTitleValue
				});
			});
		});
	});
});
