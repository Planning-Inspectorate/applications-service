const mapBackOfficeTimetableToApi = (timetables) =>
	timetables.map(
		({
			eventId,
			caseReference,
			eventTitle,
			eventTitleWelsh,
			description,
			descriptionWelsh,
			type,
			eventLineItems,
			date,
			eventDeadlineStartDate
		}) => {
			const { descriptions, descriptionsWelsh } = eventLineItems.reduce(
				(acc, { eventLineItemDescription, eventLineItemDescriptionWelsh }) => {
					acc.descriptions.push(eventLineItemDescription);
					acc.descriptionsWelsh.push(eventLineItemDescriptionWelsh);
					return acc;
				},
				{ descriptions: [], descriptionsWelsh: [] }
			);

			return {
				id: eventId,
				uniqueId: eventId.toString(),
				caseReference,
				title: eventTitle,
				titleWelsh: eventTitleWelsh,
				description: createBackOfficeDescription(description, type, descriptions),
				descriptionWelsh: createBackOfficeDescription(descriptionWelsh, type, descriptionsWelsh),
				dateOfEvent: date,
				typeOfEvent: type,
				dateTimeDeadlineStart: eventDeadlineStartDate,
				sourceSystem: 'BACK_OFFICE'
			};
		}
	);

const createBackOfficeDescription = (
	timetableDescription,
	eventType,
	eventLineItemsDescriptions
) => {
	let description = timetableDescription || '';
	const eventLineItems = eventLineItemsDescriptions.filter(Boolean);

	if (eventType === 'Deadline' && eventLineItems.length) {
		description += ' \n' + eventLineItems.map((desc) => `* ${desc}\r\n`).join('');
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
