const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-exam-timetable function`);
	const events = message.events || [];
	const currentTime = new Date();
	const caseReference = message.caseReference;

	if (!caseReference) {
		throw new Error('caseReference is required');
	}

	return await prismaClient.$transaction(async (tx) => {
		// note: because of the nesting, it's much faster easier to remove and then add any events because back office will send all events

		const event = await tx.examinationTimetable.findMany({
			where: {
				caseReference
			},
			take: 1
		});

		const existingEvent = event?.[0];
		const messageHasEvents = message.events?.length > 0;
		const shouldUpdate =
			(messageHasEvents && !existingEvent) ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingEvent.modifiedAt.toUTCString());

		if (shouldUpdate) {
			context.log(`created / updated events with caseReference: ${caseReference}`);

			// will also remove any eventLineItems due to schema constraints
			await tx.examinationTimetable.deleteMany({
				where: {
					caseReference
				}
			});

			for (const event of events) {
				await tx.examinationTimetable.create({
					data: {
						caseReference,
						type: event.type,
						eventTitle: event.eventTitle,
						...(event.eventTitleWelsh && { eventTitleWelsh: event.eventTitleWelsh }),
						description: event.description,
						...(event.descriptionWelsh && { descriptionWelsh: event.descriptionWelsh }),
						...(event.eventDeadlineStartDate && {
							eventDeadlineStartDate: new Date(event.eventDeadlineStartDate)
						}),
						date: new Date(event.date),
						eventId: event.eventId,
						eventLineItems: {
							create: event.eventLineItems?.map((eventLineItem) => ({
								eventLineItemDescription: eventLineItem.description,
								...(eventLineItem.descriptionWelsh && {
									eventLineItemDescriptionWelsh: eventLineItem.descriptionWelsh
								})
							}))
						},
						createdAt: currentTime,
						modifiedAt: currentTime
					}
				});
			}
		} else {
			context.log(
				`skipping update of events with caseReference: ${caseReference} as message is older than existing events`
			);
		}
	});
};
