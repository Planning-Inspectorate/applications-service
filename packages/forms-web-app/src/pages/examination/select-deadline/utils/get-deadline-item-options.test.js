const { getDeadlineItemOptions } = require('./get-deadline-item-options');

const { mockI18n } = require('../../../_mocks/i18n');

let session = {};

describe('pages/examination/select-deadline/utils/get-deadline-item-options', () => {
	describe('#getDeadlineItemOptions', () => {
		beforeEach(() => {
			session = {
				examination: {
					deadlineItems: [
						{
							text: 'mock text',
							textWelsh: 'mock text welsh',
							value: 'mock-value-1'
						},
						{
							text: 'mock text',
							textWelsh: 'mock text welsh',
							value: 'mock-value-2'
						},
						{
							text: 'mock text',
							textWelsh: 'mock text welsh',
							value: 'mock-value-3'
						}
					],
					editModeSubmissionItemId: '',
					submissionItems: []
				}
			};
		});

		describe('When getting the deadline options', () => {
			describe('and there are no previously selected deadline options', () => {
				describe('and the selected locale is English', () => {
					let deadlineItemOptions = [];

					beforeEach(() => {
						deadlineItemOptions = getDeadlineItemOptions(mockI18n({}), session);
					});

					it('should return the all the deadline items with english text', () => {
						expect(deadlineItemOptions).toEqual([
							{ text: 'mock text', value: 'mock-value-1' },
							{ text: 'mock text', value: 'mock-value-2' },
							{ text: 'mock text', value: 'mock-value-3' }
						]);
					});
				});

				describe('and the selected locale is Welsh', () => {
					let deadlineItemOptions = [];

					beforeEach(() => {
						deadlineItemOptions = getDeadlineItemOptions(mockI18n({}, 'cy'), session);
					});

					it('should return the all the deadline items with welsh text', () => {
						expect(deadlineItemOptions).toEqual([
							{ text: 'mock text welsh', value: 'mock-value-1' },
							{ text: 'mock text welsh', value: 'mock-value-2' },
							{ text: 'mock text welsh', value: 'mock-value-3' }
						]);
					});
				});
			});

			describe('and there is an active deadline option', () => {
				let deadlineItemOptions = [];

				beforeEach(() => {
					session.examination.activeSubmissionItemId = 'mock-value-1';
					session.examination.submissionItems = [
						{
							itemId: 'mock-value-1',
							submissionItem: 'mock text',
							submitted: false
						}
					];
					deadlineItemOptions = getDeadlineItemOptions(mockI18n({}), session);
				});

				it('should return all the deadline items with the active deadline item checked', () => {
					expect(deadlineItemOptions).toEqual([
						{ checked: 'checked', text: 'mock text', value: 'mock-value-1' },
						{ text: 'mock text', value: 'mock-value-2' },
						{ text: 'mock text', value: 'mock-value-3' }
					]);
				});
			});

			describe('and there is an active deadline option and a submitted deadline option', () => {
				let deadlineItemOptions = [];

				beforeEach(() => {
					session.examination.activeSubmissionItemId = 'mock-value-2';
					session.examination.submissionItems = [
						{
							itemId: 'mock-value-1',
							submissionItem: 'mock text',
							submitted: true
						},
						{
							itemId: 'mock-value-2',
							submissionItem: 'mock text 2',
							submitted: false
						}
					];
					deadlineItemOptions = getDeadlineItemOptions(mockI18n({}), session);
				});

				it('should return all the deadline items with the active deadline item checked', () => {
					expect(deadlineItemOptions).toEqual([
						{ checked: 'checked', text: 'mock text', value: 'mock-value-2' },
						{ text: 'mock text', value: 'mock-value-3' }
					]);
				});
			});
		});
	});
});
