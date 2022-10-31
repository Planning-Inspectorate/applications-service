let {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

const {
	getDeadlineItems,
	findDeadlineItemByValue
} = require('../../../../../src/controllers/examination/session/deadlineItems-session');

jest.mock('../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('controllers/examination/session/deadlineItems-session', () => {
	describe('#getDeadlineItems', () => {
		describe('When getting the deadline from session', () => {
			describe('and the deadline items return an array of items', () => {
				let result;
				const deadlineItems = ['array of things'];
				beforeEach(() => {
					getExaminationSession.mockReturnValue({ deadlineItems });
					result = getDeadlineItems();
				});
				it('should return the deadline items', () => {
					expect(result).toEqual(deadlineItems);
				});
			});
			describe('and the deadline items key does no exists ', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({});
				});
				it('should throw an error', () => {
					expect(() => getDeadlineItems()).toThrow('No deadline items in session');
				});
			});
			describe('and the deadline items does ot return an array', () => {
				beforeEach(() => {
					getExaminationSession.mockReturnValue({ deadlineItems: 'i should be an array' });
				});
				it('should throw an error', () => {
					expect(() => getDeadlineItems()).toThrow('Deadlines is not an array');
				});
			});
		});
	});
	describe('#findDeadlineItemByValue', () => {
		describe('When finding the deadline item by a value ', () => {
			describe('and the item exists', () => {
				const mockSession = {};
				const mockValue = 1;
				const mockDeadlineItems = [{ value: 1 }, { value: 2 }];
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue({
						deadlineItems: mockDeadlineItems
					});
					result = findDeadlineItemByValue(mockSession, mockValue);
				});
				it('should return the item that matches the value', () => {
					expect(result).toEqual({ value: 1 });
				});
			});
			describe('and the deadline item does not exist', () => {
				const mockSession = {};
				const mockValue = 3;
				const mockDeadlineItems = [{ value: 1 }, { value: 2 }];
				beforeEach(() => {
					getExaminationSession.mockReturnValue({
						deadlineItems: mockDeadlineItems
					});
				});
				it('should throw an error', () => {
					expect(() => findDeadlineItemByValue(mockSession, mockValue)).toThrow(
						'No deadline items in session'
					);
				});
			});
		});
	});
});
