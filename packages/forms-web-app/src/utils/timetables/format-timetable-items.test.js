const { removeTimetableItemFormatting, formatTimetableItems } = require('./format-timetable-items');

const { unformattedDeadlines } = require('./__mocks__/fixtures');
describe('utils/timetables/format-timetable-items', () => {
	describe('#removeTimetableItemFormatting', () => {
		describe('When removing the deadline formatting', () => {
			const response = removeTimetableItemFormatting(unformattedDeadlines);
			it('should remove all < li > tags', () => {
				expect(response).toEqual([
					'mock timetable item 1',
					'mock timetable item 2',
					'mock timetable item 3'
				]);
			});
		});
	});
	describe('#formatTimetableItems', () => {
		describe('When formatting the deadline items', () => {
			const response = formatTimetableItems({ description: unformattedDeadlines });
			it('should return the formatted text and indexed value', () => {
				expect(response).toEqual([
					{
						text: 'mock timetable item 1',
						value: '0'
					},
					{
						text: 'mock timetable item 2',
						value: '1'
					},
					{
						text: 'mock timetable item 3',
						value: '2'
					}
				]);
			});
		});
	});
});
