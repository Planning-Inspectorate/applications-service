const {
	mapSubmissionItems
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/mapSubmissionItems');

const {
	getExaminationSession
} = require('../../../../../../src/controllers/examination/session/examination-session');
const {
	filterSubmissionItems
} = require('../../../../../../src/controllers/examination/add-another-deadline-item/utils/filter-submission-items');

jest.mock('../../../../../../src/controllers/examination/session/examination-session', () => ({
	getExaminationSession: jest.fn()
}));
jest.mock(
	'../../../../../../src/controllers/examination/add-another-deadline-item/utils/filter-submission-items',
	() => ({
		filterSubmissionItems: jest.fn()
	})
);

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
		describe('and there is 1 non submitted submission item', () => {
			let result;
			const mockSession = {};
			const mockSubmissionItems = [{ submissionItem: 'mock submission item' }];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				filterSubmissionItems.mockReturnValue(mockSubmissionItems);
				result = mapSubmissionItems(mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					hasNoSubmissionItems: false,
					noDeadlineItems: {
						selectDeadlineURL: '/examination/select-deadline-item',
						title: 'You have not added a deadline item'
					},
					submissionItems: [
						{
							changeUrl: '/examination/check-your-deadline-item',
							remove: {
								url: '/examination/mark-deadline-item-to-delete'
							},
							submissionItem: 'mock submission item'
						}
					],
					title: 'You added 1 deadline item'
				});
			});
		});
		describe('and there is non submitted submission items', () => {
			let result;
			const mockSession = {};
			const mockSubmissionItems = [
				{ submissionItem: 'mock submission item' },
				{ submissionItem: 'mock another submission item' }
			];
			beforeEach(() => {
				getExaminationSession.mockReturnValue({ submissionItems: mockSubmissionItems });
				filterSubmissionItems.mockReturnValue(mockSubmissionItems);
				result = mapSubmissionItems(mockSession);
			});
			it('should return the mapped data', () => {
				expect(result).toEqual({
					hasNoSubmissionItems: false,
					noDeadlineItems: {
						selectDeadlineURL: '/examination/select-deadline-item',
						title: 'You have not added a deadline item'
					},
					submissionItems: [
						{
							changeUrl: '/examination/check-your-deadline-item',
							remove: {
								url: '/examination/mark-deadline-item-to-delete'
							},
							submissionItem: 'mock submission item'
						},
						{
							changeUrl: '/examination/check-your-deadline-item',
							remove: {
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
