const {
	mapSubmissionItems
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/mapSubmissionItems');
const {
	getExaminationSession
} = require('../../../../../../src/controllers/examination/session/examination-session');

jest.mock('../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));

describe('#mapSubmissionItems', () => {
	describe('When mapping the submission items', () => {
		describe('and there are no submission item', () => {
			beforeEach(() => {
				getExaminationSession.mockReturnValue('i am empty');
			});
			it('should throw an error', () => {
				expect(() => mapSubmissionItems()).toThrow('No submission items in session');
			});
		});
		describe('and there is 1 submission item', () => {
			let result;
			const mockSession = {};
			const mockSubmissionItems = [{ submissionItem: 'mock submission item', itemId: 1 }];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				result = mapSubmissionItems(mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					submissionItems: [
						{
							change: {
								itemId: 1,
								url: '/examination/change-a-deadline-item'
							},
							remove: {
								itemId: 1,
								url: '/examination/mark-deadline-item-to-delete'
							},
							submissionItem: 'mock submission item'
						}
					],
					title: 'You added 1 deadline item'
				});
			});
		});
		describe('and there is submission items', () => {
			let result;
			const mockSession = {};
			const mockSubmissionItems = [
				{ submissionItem: 'mock submission item', itemId: 1 },
				{ submissionItem: 'mock another submission item', itemId: 2 }
			];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				result = mapSubmissionItems(mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					submissionItems: [
						{
							change: {
								itemId: 1,
								url: '/examination/change-a-deadline-item'
							},
							remove: {
								itemId: 1,
								url: '/examination/mark-deadline-item-to-delete'
							},
							submissionItem: 'mock submission item'
						},
						{
							change: {
								itemId: 2,
								url: '/examination/change-a-deadline-item'
							},
							remove: {
								itemId: 2,
								url: '/examination/mark-deadline-item-to-delete'
							},
							submissionItem: 'mock another submission item'
						}
					],
					title: 'You added 2 deadline items'
				});
			});
		});
	});
});
