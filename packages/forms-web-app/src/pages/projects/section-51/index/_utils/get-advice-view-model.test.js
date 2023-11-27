const { getAdviceViewModel } = require('./get-advice-view-model');
const { adviceList } = require('../../__mocks__/fixtures');
describe('pages/projects/section-51/index/_utils/get-advice-view-model', () => {
	describe('#getAdviceViewModel', () => {
		describe('When the advice given is a meeting', () => {
			const response = getAdviceViewModel(adviceList);
			it('should return the meeting view model with the correct meeting text and non meeting text', () => {
				expect(response).toEqual([
					{
						date: {
							date: '2023-01-01',
							text: 'Date advice given:'
						},
						link: '/projects/:case_ref/s51advice/mock advice id 1',
						linkTitle: 'View advice to mock organisation',
						method: 'mock enquiry method'
					},
					{
						date: {
							date: 'mock date given 2',
							text: 'Date of meeting:'
						},
						link: '/projects/:case_ref/s51advice/mock advice id 2',
						linkTitle: 'View meeting with mock organisation',
						method: 'Meeting'
					},
					{
						date: {
							date: 'mock date given 3',
							text: 'Date advice given:'
						},
						link: '/projects/:case_ref/s51advice/mock advice id 3',
						linkTitle: 'View advice to mock first name mock last name',
						method: 'Email'
					},
					{
						date: {
							date: 'mock date given 4',
							text: 'Date advice given:'
						},
						link: '/projects/:case_ref/s51advice/mock advice id 4',
						linkTitle: 'View advice to Anonymous',
						method: 'Email'
					}
				]);
			});
		});
	});
});
