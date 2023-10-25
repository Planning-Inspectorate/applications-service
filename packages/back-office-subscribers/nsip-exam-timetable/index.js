const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-exam-timetable function with message: ${JSON.stringify(message)}`);
	const events = message.events || [];
	const currentTime = new Date();

	return await prismaClient.$transaction(async (tx) => {
		// note: because of the nesting, it's much faster easier to remove and then add any events because back office will send all events

		const event = await tx.examinationTimetable.findMany({
			where: {
				examinationTimetableId: message.examinationTimetableId
			},
			rejectOnNotFound: false,
			take: 1
		});

		const existingEvent = event?.[0];

		const shouldUpdate =
			!existingEvent ||
			new Date(context.bindingData.enqueuedTimeUtc).toUTCString() >
				existingEvent.modifiedAt.toUTCString();

		if (shouldUpdate) {
			// will also remove any eventLineItems due to schema constraints
			await tx.examinationTimetable.deleteMany({
				where: {
					examinationTimetableId: message.examinationTimetableId
				}
			});

			for (const event of events) {
				await tx.examinationTimetable.create({
					data: {
						examinationTimetableId: message.examinationTimetableId,
						caseReference: message.caseReference,
						type: event.type,
						eventTitle: event.eventTitle,
						description: event.description,
						eventDeadlineStartDate: new Date(event.eventDeadlineStartDate),
						date: new Date(event.date),
						eventId: event.eventId,
						eventLineItems: {
							create: event.eventLineItems.map((eventLineItem) => ({
								eventLineItemId: eventLineItem.eventLineItemId,
								eventLineItemDescription: eventLineItem.eventLineItemDescription
							}))
						},
						createdAt: currentTime,
						modifiedAt: currentTime
					}
				});

				context.log(
					`created / updated events with examinationTimetableId: ${message.examinationTimetableId}`
				);
			}
		} else {
			context.log(
				`skipping update for examinationTimetableId: ${message.examinationTimetableId} as message is older than existing events`
			);
		}
	});
};
