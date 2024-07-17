const {
	deadlineItemViewModel,
	getDeadlineItemViewModelLocale
} = require('./deadline-item-view-model');

const { mockI18n } = require('../../../_mocks/i18n');

describe('pages/examination/_utils/_view-models/deadline-item-view-model', () => {
	describe('#deadlineItemViewModel', () => {
		it('should return the deadline item view model', () => {
			expect(deadlineItemViewModel('mock text', 'mock value')).toEqual({
				text: 'mock text',
				value: 'mock value'
			});
		});
	});

	describe('#getDeadlineItemViewModelLocale', () => {
		describe('When getting the deadline item view model locale', () => {
			const mockDeadlineItem = {
				text: 'mock text en',
				textWelsh: 'mock text cy',
				value: 'mock value'
			};

			describe('and the selected locale is English', () => {
				it('should return the deadline item view model with English text', () => {
					expect(getDeadlineItemViewModelLocale(mockI18n({}), mockDeadlineItem)).toEqual({
						text: 'mock text en',
						value: 'mock value'
					});
				});
			});

			describe('and the selected locale is Welsh', () => {
				it('should return the deadline item view model with Welsh text', () => {
					expect(getDeadlineItemViewModelLocale(mockI18n({}, 'cy'), mockDeadlineItem)).toEqual({
						text: 'mock text cy',
						value: 'mock value'
					});
				});
			});
		});
	});
});
