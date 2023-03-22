const {
	unformattedDeadlines
} = require('../../pages/examination/have-your-say/__mocks__/fixtures');
const fixturesTimetableResponse = {
	data: {
		timetables: [
			{
				dateOfEvent: '2023-01-01',
				description: '<p>mock description 1</p>',
				title: 'mock title 1',
				uniqueId: 'mock id 1',
				typeOfEvent: 'mock event type 1'
			},
			{
				dateOfEvent: '2023-01-01',
				description: unformattedDeadlines,
				title: 'mock title 2',
				uniqueId: 'mock id 2',
				typeOfEvent: 'Deadline'
			},
			{
				dateOfEvent: '2023-01-03',
				description: '<p>mock description 3</p>',
				title: 'mock title 3',
				uniqueId: 'mock id 3',
				typeOfEvent: 'mock event type 3'
			},
			{
				dateOfEvent: '2023-01-03',
				dateTimeDeadlineStart: '2023-01-02',
				description: '<p>mock description 4</p>',
				title: 'mock title 4',
				uniqueId: 'mock id 4',
				typeOfEvent: 'Deadline'
			}
		]
	}
};

module.exports = {
	fixturesTimetableResponse
};
