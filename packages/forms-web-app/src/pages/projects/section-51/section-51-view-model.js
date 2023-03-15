const { adviceViewModel } = require('./section-51.view-model');
const { adviceList } = require('./__mocks__/fixtures');
describe('adviceVM', () => {
	describe('#advicesVM', () => {
		describe('When the advice given is a meeting', () => {
			const response = adviceViewModel(adviceList);
			it('should return the meeting view model with the correct meeting text and non meeting text', () => {
				expect(response).toEqual([
					{
						adviceID: 'mock advice id 1',
						date: {
							date: '2023-01-01',
							text: 'Date advice given:'
						},
						link: 'View advice to mock organisation',
						method: 'mock enquiry method'
					},
					{
						adviceID: 'mock advice id 2',
						date: {
							date: 'mock date given 2',
							text: 'Date of meeting:'
						},
						link: 'View meeting with mock organisation',
						method: 'Meeting'
					},
					{
						adviceID: 'mock advice id 3',
						date: {
							date: 'mock date given 3',
							text: 'Date advice given:'
						},
						link: 'View advice to mock first name mock last name',
						method: 'Email'
					},
					{
						adviceID: 'mock advice id 4',
						date: {
							date: 'mock date given 4',
							text: 'Date advice given:'
						},
						link: 'View advice to Anonymous',
						method: 'Email'
					}
				]);
			});
		});
	});
});
