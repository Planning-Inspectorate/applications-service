const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-exam-timetable function with message: ${JSON.stringify(message)}`);
	const messageTime = new Date(context.bindingData.enqueuedTimeUtc);
	const events = message.events || [];

	return await prismaClient.$transaction(async (tx) => {
		for (const event of events) {
			console.log({ event });
			const existingEvent = await tx.examinationTimetable.findUnique({
				where: {
					eventId: event.eventId
				},
				include: {
					eventLineItems: true
				}
			});

			console.log({ existingEvent, messageTime });

			if (!existingEvent || messageTime > new Date(existingEvent?.modifiedAt)) {
				const createdOrUpdatedEvent = {
					examinationTimetableId: message.examinationTimetableId,
					caseReference: event.caseReference, // check what level this is sent at when back office is ready
					type: event.type,
					eventTitle: event.eventTitle,
					description: event.description,
					eventDeadlineStartDate: new Date(event.eventDeadlineStartDate),
					date: new Date(event.date),
					modifiedAt: event.modifiedAt,
					eventLineItems: {
						upsert: event.eventLineItems.map((eventLineItem) => ({
							where: {
								eventLineItemId: eventLineItem.eventLineItemId
							},
							update: {
								eventLineItemDescription: eventLineItem.eventLineItemDescription
							},
							create: {
								eventLineItemId: eventLineItem.eventLineItemId,
								eventLineItemDescription: eventLineItem.eventLineItemDescription
							}
						}))
					}
				};

				await tx.examinationTimetable.upsert({
					where: {
						eventId: event.eventId
					},
					update: {
						...createdOrUpdatedEvent
					},
					create: {
						...createdOrUpdatedEvent,
						eventId: event.eventId
					},
					include: { eventLineItems: true }
				});
			}
		}
	});
};
