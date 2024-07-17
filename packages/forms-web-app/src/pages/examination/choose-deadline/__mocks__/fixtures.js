const {
	unformattedDeadlines,
	unformattedDeadlinesWelsh
} = require('../../../../utils/timetables/__mocks__/fixtures');

const datePresent = '2022-01-02';
const datePast = '2022-01-01';
const dateUpcoming = '2022-01-03';

const timetables = {
	data: {
		timetables: [
			{
				dateOfEvent: dateUpcoming,
				dateTimeDeadlineStart: datePresent,
				description: unformattedDeadlines,
				descriptionWelsh: unformattedDeadlinesWelsh,
				title: 'mock title 1',
				titleWelsh: 'mock title 1 Welsh',
				uniqueId: 'mock uid 1',
				typeOfEvent: 'Deadline'
			},
			{
				dateOfEvent: '2022-01-04',
				dateTimeDeadlineStart: dateUpcoming,
				description: unformattedDeadlines,
				descriptionWelsh: unformattedDeadlinesWelsh,
				title: 'mock title 2',
				titleWelsh: 'mock title 2 Welsh',
				uniqueId: 'mock uid 2',
				typeOfEvent: 'Deadline'
			},
			{
				dateOfEvent: dateUpcoming,
				dateTimeDeadlineStart: dateUpcoming,
				description: unformattedDeadlines,
				descriptionWelsh: unformattedDeadlinesWelsh,
				title: 'mock title 3',
				titleWelsh: 'mock title 3 Welsh',
				uniqueId: 'mock uid 3',
				typeOfEvent: 'Not deadline'
			},
			{
				dateOfEvent: datePast,
				dateTimeDeadlineStart: datePast,
				description: unformattedDeadlines,
				descriptionWelsh: unformattedDeadlinesWelsh,
				title: 'mock title 4',
				titleWelsh: 'mock title 4 Welsh',
				uniqueId: 'mock uid 4',
				typeOfEvent: 'Not deadline'
			}
		]
	}
};

module.exports = {
	datePresent,
	timetables
};
