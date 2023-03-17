const { getSummaryListItemSubmissionItem } = require('./index');
const { showDeadlineItemChangeUrl } = require('./show-deadline-item-change-url');

jest.mock('./show-deadline-item-change-url', () => ({
	showDeadlineItemChangeUrl: jest.fn()
}));

describe('examination/check-submission-item/utils/summary-list-item/submission-item', () => {
	describe('#getSummaryListItemSubmissionItem', () => {
		describe('When invoking the getSummaryListItemSubmissionItem function', () => {
			describe('and the session has a submission item value', () => {
				describe('and submission items has less than the number of items in deadline items', () => {
					const mockSubmissionItem = {
						submissionItem: 'submission item'
					};
					let result;
					beforeEach(() => {
						showDeadlineItemChangeUrl.mockReturnValue(true);
						result = getSummaryListItemSubmissionItem(mockSubmissionItem, {});
					});
					it('should return the object', () => {
						expect(result).toEqual({
							actions: {
								items: [
									{
										href: '/examination/select-deadline-item?mode=edit',
										text: 'Change',
										visuallyHiddenText: 'Deadline item'
									}
								]
							},
							key: { text: 'Deadline item' },
							value: { html: 'submission item' }
						});
					});
				});
				describe('and submission items has the same number of items as deadline items', () => {
					const mockSubmissionItem = {
						submissionItem: 'submission item'
					};
					let result;
					beforeEach(() => {
						showDeadlineItemChangeUrl.mockReturnValue(false);
						result = getSummaryListItemSubmissionItem(mockSubmissionItem, {});
					});
					it('should return the object', () => {
						expect(result).toEqual({
							key: { text: 'Deadline item' },
							value: { html: 'submission item' }
						});
					});
				});
			});
			describe('and the session does not have a submission item value', () => {
				const mockSubmissionItem = {};
				it('should return throw an error', () => {
					expect(() => getSummaryListItemSubmissionItem(mockSubmissionItem)).toThrow(
						'Submission item does not have a submission item value'
					);
				});
			});
		});
	});
});
