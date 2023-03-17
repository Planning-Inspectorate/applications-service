let { getExaminationSession } = require('./examination-session');

const {
	getDeadlineItems,
	findDeadlineItemByValue,
	getDeadlineItemStillToSubmit,
	setDeadlineItemToDelete,
	getDeadlineItemToDelete
} = require('./deadlineItems-session');

jest.mock('./examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('examination/session/deadlineItems-session', () => {
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
	describe('#getDeadlineItemStillToSubmit', () => {
		describe('When getting the remaining deadline items to submit', () => {
			describe('and there are deadline items remaining to submit', () => {
				const mockSession = 'mock session';
				const mockExaminationSession = {
					deadlineItems: [{ value: 1 }, { value: 2 }],
					submissionItems: [{ itemId: 1, submitted: true }]
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItemStillToSubmit(mockSession);
				});
				it('should return a list of remaining deadline items', () => {
					expect(result).toEqual([{ value: 2 }]);
				});
			});
			describe('and there are NO deadline items remaining to submit', () => {
				const mockSession = 'mock session';
				const mockExaminationSession = {
					deadlineItems: [{ value: 1 }, { value: 2 }],
					submissionItems: [
						{ itemId: 1, submitted: true },
						{ itemId: 2, submitted: true }
					]
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItemStillToSubmit(mockSession);
				});
				it('should return an empty array', () => {
					expect(result).toEqual([]);
				});
			});
			describe('and there are no submitted submission items', () => {
				const mockSession = 'mock session';
				const deadlineItems = [{ value: 1 }, { value: 2 }];
				const mockExaminationSession = {
					deadlineItems,
					submissionItems: [
						{ itemId: 1, submitted: false },
						{ itemId: 2, submitted: false }
					]
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItemStillToSubmit(mockSession);
				});
				it('should return the deadline items', () => {
					expect(result).toEqual(deadlineItems);
				});
			});
			describe('and there are No submission items', () => {
				const mockSession = 'mock session';
				const deadlineItems = [
					{ text: 'should be removed' },
					{ text: 'should be removed as well' }
				];
				const mockExaminationSession = {
					deadlineItems
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItemStillToSubmit(mockSession);
				});
				it('should return the deadline items', () => {
					expect(result).toEqual(deadlineItems);
				});
			});
		});
	});

	describe('#setDeadlineItemToDelete', () => {
		describe('When setting the deadline item to delete', () => {
			describe('and the item id is provided', () => {
				let mockExaminationSession = {};
				const mockSession = {};
				let deleteItemId = 0;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					setDeadlineItemToDelete(mockSession, deleteItemId);
				});
				it('should set the deadline item to delete on the examination session', () => {
					expect(mockExaminationSession).toEqual({
						deadlineItemToDelete: 0
					});
				});
			});
			describe('and the item id is NOT provided', () => {
				const mockExaminationSession = {};
				const mockSession = {};
				let deleteItemId;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
				});
				it('should set the deadline item to delete on the examination session', () => {
					expect(() => setDeadlineItemToDelete(mockSession, deleteItemId)).toThrow(
						'No item id to delete'
					);
				});
			});
		});
	});
	describe('#getDeadlineItemToDelete', () => {
		describe('When getting the deadline item to delete from session', () => {
			describe('and the deadline itemId to delete exists', () => {
				const mockSession = {};
				const mockExaminationSession = { deadlineItemToDelete: 0 };
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItemToDelete(mockSession);
				});
				it('should return the deadline item', () => {
					expect(result).toEqual(0);
				});
			});
			describe('and the deadline itemId to delete does NOT exists', () => {
				const mockSession = {};
				const mockExaminationSession = {};
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
				});
				it('should return the deadline item', () => {
					expect(() => getDeadlineItemToDelete(mockSession)).toThrow(
						'No deadline itemID to delete'
					);
				});
			});
		});
	});
});
