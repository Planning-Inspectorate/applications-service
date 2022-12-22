const {
	showDeadlineItemChangeUrl
} = require('../../../../../../../src/controllers/examination/check-submission-item/utils/summary-list-item/show-deadline-item-change-url');

describe('controllers/examination/check-submission-item/utils/summary-list-item/show-deadline-item-change-url', () => {
	describe('#showDeadlineItemChangeUrl', () => {
		describe('When getting the boolean value to show or hide the change deadline item url for the summary list item for the check your answers page', () => {
			describe('and submission items has the same number of items as deadline items', () => {
				const session = {
					examination: {
						caseRef: 'TEST001',
						deadlineItems: [
							{ value: '0', text: 'Deadline 1' },
							{ value: '1', text: 'Deadline 2' },
							{ value: '2', text: 'Deadline 3' }
						],
						submissionItems: [
							{ itemId: '0', submissionItem: 'Deadline 1' },
							{ itemId: '1', submissionItem: 'Deadline 2' },
							{ itemId: '2', submissionItem: 'Deadline 3' }
						]
					}
				};

				const result = showDeadlineItemChangeUrl(session);
				it('should return false', () => {
					expect(result).toEqual(false);
				});
			});
			describe('and submission items has less than the number of items in deadline items', () => {
				const session = {
					examination: {
						caseRef: 'TEST002',
						deadlineItems: [
							{ value: '0', text: 'Deadline 1' },
							{ value: '1', text: 'Deadline 2' },
							{ value: '2', text: 'Deadline 3' }
						],
						submissionItems: [
							{ itemId: '0', submissionItem: 'Deadline 1' },
							{ itemId: '1', submissionItem: 'Deadline 2' }
						]
					}
				};
				const result = showDeadlineItemChangeUrl(session);
				it('should return true', () => {
					expect(result).toEqual(true);
				});
			});
		});
	});
});
