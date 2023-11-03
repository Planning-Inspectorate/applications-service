const mapBackOfficeTimetableToApi = (timetables) =>
	timetables.map((t) => ({
		id: t.eventId,
		uniqueId: t.eventId.toString(),
		caseReference: t.caseReference,
		title: t.eventTitle,
		description: createBackOfficeDescription(t.description, t.type, t.eventLineItems),
		dateOfEvent: t.date,
		typeOfEvent: t.type,
		dateTimeDeadlineStart: t.eventDeadlineStartDate,
		sourceSystem: 'BACK_OFFICE'
	}));

const createBackOfficeDescription = (timetableDescription, eventType, eventLineItems) => {
	let description = timetableDescription;
	if (eventType === 'Deadline') {
		description += ' \n';
		eventLineItems.forEach((item) => {
			description += '* ' + item.eventLineItemDescription + '\r\n';
		});
	}
	return description;
};

const mapNITimetableToApi = (timetables) =>
	timetables.map((t) => ({
		id: t.id,
		uniqueId: t.unique_id,
		caseReference: t.case_reference,
		title: t.title,
		description: t.description,
		dateOfEvent: t.date_of_event,
		timetableType: t.timetable_type,
		typeOfEvent: t.type_of_event,
		dateTimeDeadlineStart: t.dateTimeDeadlineStart,
		sourceSystem: t.sourceSystem
	}));

module.exports = {
	mapBackOfficeTimetableToApi,
	mapNITimetableToApi
};
