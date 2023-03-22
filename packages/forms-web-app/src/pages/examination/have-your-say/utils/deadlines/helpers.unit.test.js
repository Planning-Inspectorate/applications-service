const { removeDeadlineFormatting, formatDeadlineItems } = require('./helpers');
const { unformattedDeadlines } = require('../../__mocks__/fixtures');
describe('have your say deadlines', () => {
	describe('#removeDeadlineFormatting', () => {
		describe('When removing the deadline formatting', () => {
			const response = removeDeadlineFormatting(unformattedDeadlines);
			it('should remove all < li > tags', () => {
				expect(response).toEqual([
					'Comments on submissions received for Deadline 2',
					'Written summaries of oral submissions made at Hearings held during the w/c 26 September',
					'Updated SoCG requested by the ExA'
				]);
			});
		});
	});
	describe('#formatDeadlineItems', () => {
		describe('When formatting the deadline items', () => {
			const response = formatDeadlineItems({ description: unformattedDeadlines });
			it('should return the formatted text and indexed value', () => {
				expect(response).toEqual([
					{
						text: 'Comments on submissions received for Deadline 2',
						value: '0'
					},
					{
						text: 'Written summaries of oral submissions made at Hearings held during the w/c 26 September',
						value: '1'
					},
					{
						text: 'Updated SoCG requested by the ExA',
						value: '2'
					}
				]);
			});
		});
	});
});
