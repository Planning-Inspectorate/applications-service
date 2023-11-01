const TIMETABLES_NI_RESPONSE = [
	{
		id: 1,
		uniqueId: 'WS010006-34601',
		caseReference: 'NI-CASEID',
		title: 'Deadline 1A',
		description:
			'The ExA is under a duty to complete the Examination of the application by the end of the period of six months',
		dateOfEvent: '2020-02-19 11:21:42',
		timetableType: 'Exams',
		typeOfEvent: 'Deadline',
		dateTimeDeadlineStart: '2020-05-16 15:44:52',
		sourceSystem: 'Horizon'
	},
	{
		id: 2,
		uniqueId: 'WS010006-34602',
		caseReference: 'NI-CASEID',
		title: 'Deadline 2',
		description: 'Pre examination for the application by the end of the period of six months',
		dateOfEvent: '2020-08-19 11:21:42',
		timetableType: 'Exams',
		typeOfEvent: 'Deadline',
		dateTimeDeadlineStart: '2020-05-16 15:44:52',
		sourceSystem: 'Horizon'
	}
];

const TIMETABLES_NI_DATA = [
	{
		id: 1,
		unique_id: 'WS010006-34601',
		case_reference: 'NI-CASEID',
		title: 'Deadline 1A',
		description:
			'The ExA is under a duty to complete the Examination of the application by the end of the period of six months',
		date_of_event: '2020-02-19 11:21:42',
		timetable_type: 'Exams',
		type_of_event: 'Deadline',
		dateTimeDeadlineStart: '2020-05-16 15:44:52',
		sourceSystem: 'Horizon'
	},
	{
		id: 2,
		unique_id: 'WS010006-34602',
		case_reference: 'NI-CASEID',
		title: 'Deadline 2',
		description: 'Pre examination for the application by the end of the period of six months',
		date_of_event: '2020-08-19 11:21:42',
		timetable_type: 'Exams',
		type_of_event: 'Deadline',
		dateTimeDeadlineStart: '2020-05-16 15:44:52',
		sourceSystem: 'Horizon'
	}
];

const TIMETABLES_BACKOFFICE_RESPONSE = [
	{
		id: 1,
		uniqueId: '1',
		caseReference: 'BACKOFFICE-CASEID',
		title: 'Deadline 1A',
		description:
			'The ExA is under a duty to complete the Examination of the application by the end of the period of six months \n* description 1\r\n* description 2\r\n',
		dateOfEvent: '2020-02-19 11:21:42',
		typeOfEvent: 'Deadline',
		dateTimeDeadlineStart: '2020-05-16 15:44:52',
		sourceSystem: 'BACK_OFFICE'
	},
	{
		id: 2,
		uniqueId: '2',
		caseReference: 'BACKOFFICE-CASEID',
		title: 'PRELIMINARY MEETING A1',
		description: 'Preliminary meeting for the application by the end of the period of six months',
		dateOfEvent: '2020-08-19 11:21:42',
		typeOfEvent: 'Preliminary Meeting',
		dateTimeDeadlineStart: '2020-05-16 15:44:52',
		sourceSystem: 'BACK_OFFICE'
	}
];
const TIMETABLES_BACKOFFICE_DATA = [
	{
		examinationTimetableId: 1,
		eventId: 1,
		caseReference: 'BACKOFFICE-CASEID',
		description:
			'The ExA is under a duty to complete the Examination of the application by the end of the period of six months',
		eventTitle: 'Deadline 1A',
		date: '2020-02-19 11:21:42',
		type: 'Deadline',
		eventDeadlineStartDate: '2020-05-16 15:44:52',
		eventLineItems: [
			{
				eventLineItemDescription: 'description 1'
			},
			{
				eventLineItemDescription: 'description 2'
			}
		]
	},
	{
		examinationTimetableId: 2,
		eventId: 2,
		description: 'Preliminary meeting for the application by the end of the period of six months',
		caseReference: 'BACKOFFICE-CASEID',
		eventTitle: 'PRELIMINARY MEETING A1',
		date: '2020-08-19 11:21:42',
		type: 'Preliminary Meeting',
		eventDeadlineStartDate: '2020-05-16 15:44:52',
		eventLineItems: []
	}
];

module.exports = {
	TIMETABLES_NI_RESPONSE,
	TIMETABLES_NI_DATA,
	TIMETABLES_BACKOFFICE_RESPONSE,
	TIMETABLES_BACKOFFICE_DATA
};
