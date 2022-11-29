const {
	getDeadlineItems,
	setDeadlineItems
} = require('../../../../../src/controllers/session/deadline/items');

const {
	getExaminationSession
} = require('../../../../../src/controllers/session/examination-session');

jest.mock('../../../../../src/controllers/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/session/deadline/items', () => {
	const req = {
		session: { mockSession: 'mock session' }
	};
	describe('#getDeadlineItems', () => {
		describe('When getting the deadline items from the examination session', () => {
			describe('and there are no deadline items in the examination session', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineItems()).toThrow('Deadline items not found');
				});
			});
			describe('and there are deadline items in the examination session', () => {
				let result;
				const mockExaminationSession = {
					deadlineItems: ['mock deadline item 1', 'mock deadline item 2']
				};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItems(req.session);
				});
				it('should call the function', () => {
					expect(getExaminationSession).toHaveBeenCalledWith(req.session);
				});
				it('should return the deadline items', () => {
					expect(result).toEqual(mockExaminationSession.deadlineItems);
				});
			});
		});
	});
	describe('#setDeadlineItems', () => {
		describe('When setting the deadline items in the examination session', () => {
			const mockExaminationSession = {};
			const mockDeadlineItems = 'mock deadline items';
			beforeEach(() => {
				getExaminationSession.mockReturnValue(mockExaminationSession);
				setDeadlineItems(req.session, mockDeadlineItems);
			});
			it('should call the function', () => {
				expect(getExaminationSession).toHaveBeenCalledWith(req.session);
			});
			it('should add the deadline items to the examination session', () => {
				expect(mockExaminationSession).toEqual({
					deadlineItems: mockDeadlineItems
				});
			});
		});
	});
});
