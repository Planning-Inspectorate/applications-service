let {
	getExaminationSession
} = require('../../../../../src/controllers/examination/session/examination-session');

const {
	getDeadlineItems,
	findDeadlineItemByValue,
	getDeadlineItemStillToSubmit
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
	describe('#getDeadlineItemStillToSubmit', () => {
		describe('When getting the remaining deadline items to submit', () => {
			describe('and there are deadline items remaining to submit', () => {
				const mockSession = 'mock session';
				const mockExaminationSession = {
					deadlineItems: [{ text: 'should be removed' }, { text: 'keep me' }],
					submissionItems: [{ submissionItem: 'should be removed' }]
				};
				let result;
				beforeEach(() => {
					getExaminationSession.mockReturnValue(mockExaminationSession);
					result = getDeadlineItemStillToSubmit(mockSession);
				});
				it('should return a list of remaining deadline items', () => {
					expect(result).toEqual([
						{
							text: 'keep me'
						}
					]);
				});
			});
			describe('and there are NO deadline items remaining to submit', () => {
				const mockSession = 'mock session';
				const mockExaminationSession = {
					deadlineItems: [{ text: 'should be removed' }, { text: 'should be removed as well' }],
					submissionItems: [
						{ submissionItem: 'should be removed' },
						{ submissionItem: 'should be removed as well' }
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
			describe('and submission items is empty', () => {
				const mockSession = 'mock session';
				const deadlineItems = [
					{ text: 'should be removed' },
					{ text: 'should be removed as well' }
				];
				const mockExaminationSession = {
					deadlineItems,
					submissionItems: []
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
});
