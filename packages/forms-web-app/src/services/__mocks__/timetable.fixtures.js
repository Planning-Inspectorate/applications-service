const {
	unformattedDeadlines,
	unformattedDeadlinesWelsh
} = require('../../utils/timetables/__mocks__/fixtures');
const fixturesTimetableResponse = {
	data: {
		timetables: [
			{
				dateOfEvent: '2023-01-01',
				dateTimeDeadlineStart: '2023-01-01',
				description: '<p>mock description 1</p>',
				descriptionWelsh: '<p>mock description 1 Welsh</p>',
				title: 'mock title 1',
				titleWelsh: 'mock title 1 Welsh',
				uniqueId: 'mock id 1',
				typeOfEvent: 'mock event type 1'
			},
			{
				dateOfEvent: '2023-01-01',
				dateTimeDeadlineStart: '2023-01-01',
				description: unformattedDeadlines,
				descriptionWelsh: unformattedDeadlinesWelsh,
				title: 'mock title 2',
				titleWelsh: 'mock title 2 Welsh',
				uniqueId: 'mock id 2',
				typeOfEvent: 'Deadline'
			},
			{
				dateOfEvent: '2023-01-03',
				dateTimeDeadlineStart: '2023-01-03',
				description: '<p>mock description 3</p>',
				descriptionWelsh: '<p>mock description 3 Welsh</p>',
				title: 'mock title 3',
				titleWelsh: 'mock title 3 Welsh',
				uniqueId: 'mock id 3',
				typeOfEvent: 'mock event type 3'
			},
			{
				dateOfEvent: '2023-01-03',
				dateTimeDeadlineStart: '2023-01-02',
				description: '<p>mock description 4</p>',
				descriptionWelsh: '<p>mock description 4 Welsh</p>',
				title: 'mock title 4',
				titleWelsh: 'mock title 4 Welsh',
				uniqueId: 'mock id 4',
				typeOfEvent: 'Deadline'
			}
		]
	}
};

module.exports = {
	fixturesTimetableResponse
};
