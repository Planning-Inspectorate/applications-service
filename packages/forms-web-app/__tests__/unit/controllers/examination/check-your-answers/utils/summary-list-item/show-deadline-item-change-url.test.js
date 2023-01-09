const {
	showDeadlineItemChangeUrl
} = require('../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/show-deadline-item-change-url');
const {
	getDeadlineItems
} = require('../../../../../../../src/controllers/examination/session/deadline/items');
const {
	getSubmissionItems
} = require('../../../../../../../src/controllers/examination/session/submission-items-session');

jest.mock('../../../../../../../src/controllers/examination/session/deadline/items', () => ({
	getDeadlineItems: jest.fn()
}));
jest.mock(
	'../../../../../../../src/controllers/examination/session/submission-items-session',
	() => ({
		getSubmissionItems: jest.fn()
	})
);

describe('controllers/examination/check-submission-item/utils/summary-list-item/show-deadline-item-change-url', () => {
	describe('#showDeadlineItemChangeUrl', () => {
		describe('When getting the boolean value to show or hide the change deadline item url for the summary list item for the check your answers page', () => {
			describe('and submission items has the same number of items as deadline items', () => {
				let result;
				beforeEach(() => {
					getDeadlineItems.mockReturnValue([
						{ value: '0', text: 'Deadline 1' },
						{ value: '1', text: 'Deadline 2' },
						{ value: '2', text: 'Deadline 3' }
					]);
					getSubmissionItems.mockReturnValue([
						{ itemId: '0', submissionItem: 'Deadline 1' },
						{ itemId: '1', submissionItem: 'Deadline 2' },
						{ itemId: '2', submissionItem: 'Deadline 3' }
					]);
					result = showDeadlineItemChangeUrl({});
				});
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
			describe('and submission items has less than the number of items in deadline items', () => {
				let result;
				beforeEach(() => {
					getDeadlineItems.mockReturnValue([
						{ value: '0', text: 'Deadline 1' },
						{ value: '1', text: 'Deadline 2' },
						{ value: '2', text: 'Deadline 3' }
					]);
					getSubmissionItems.mockReturnValue([
						{ itemId: '0', submissionItem: 'Deadline 1' },
						{ itemId: '1', submissionItem: 'Deadline 2' }
					]);
					result = showDeadlineItemChangeUrl({});
				});
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
		});
	});
});
