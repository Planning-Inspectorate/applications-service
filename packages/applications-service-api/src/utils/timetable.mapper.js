const mapTimetableToAPI = (timetables) =>
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
				description: createDescription(description, type, descriptions),
				descriptionWelsh: createDescription(descriptionWelsh, type, descriptionsWelsh),
				dateOfEvent: date,
				typeOfEvent: type,
				dateTimeDeadlineStart: eventDeadlineStartDate,
				sourceSystem: 'BACK_OFFICE'
			};
		}
	);

const createDescription = (timetableDescription, eventType, eventLineItemsDescriptions) => {
	if (!timetableDescription) return '';

	let description = timetableDescription;
	if (eventType === 'Deadline') {
		const filteredDescriptions = eventLineItemsDescriptions.filter(Boolean);
		description += ' \n' + filteredDescriptions.map((desc) => `* ${desc}\r\n`).join('');
	}
	return description;
};

module.exports = {
	mapTimetableToAPI
};
