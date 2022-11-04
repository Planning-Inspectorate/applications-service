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
			const mockSubmissionItems = [{ submissionItem: 'mock submission item' }];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				result = mapSubmissionItems(mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					submissionItems: [
						{
							changeUrl: '/examination/check-your-deadline-item',
							removeUrl: '/examination/select-if-want-to-delete-data',
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
				{ submissionItem: 'mock submission item' },
				{ submissionItem: 'mock another submission item' }
			];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				result = mapSubmissionItems(mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					submissionItems: [
						{
							changeUrl: '/examination/check-your-deadline-item',
							removeUrl: '/examination/select-if-want-to-delete-data',
							submissionItem: 'mock submission item'
						},
						{
							changeUrl: '/examination/check-your-deadline-item',
							removeUrl: '/examination/select-if-want-to-delete-data',
							submissionItem: 'mock another submission item'
						}
					],
					title: 'You added 2 deadline items'
				});
			});
		});
	});
});
