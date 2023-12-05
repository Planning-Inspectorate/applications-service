const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-representation function`);
	const representationId = message.representationId;

	if (!representationId) {
		context.log(`skipping update as representationId is missing`);
		return;
	}

	return await prismaClient.$transaction(async (tx) => {
		const existingRepresentation = await tx.representation.findUnique({
			where: {
				representationId
			}
		});
		const shouldUpdate =
			!existingRepresentation ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingRepresentation.modifiedAt.toUTCString());

		if (!shouldUpdate) {
			context.log(`skipping update of representation with representationId: ${representationId}`);
			return;
		}
		let representation = {
			representationId: message.representationId,
			caseReference: message.caseRef,
			caseId: message.caseId,
			referenceId: message.referenceId,
			status: message.status,
			dateReceived: message.dateReceived,
			representationComment: message.redacted
				? message.redactedRepresentation
				: message.originalRepresentation,
			representationFrom: message.representationFrom,
			representationType: message.representationType,
			registerFor: message.registerFor,
			representedId: message.representedId,
			representativeId: message.representativeId,
			attachments: message.attachmentIds?.join(','),
			modifiedAt: new Date()
		};

		await tx.representation.upsert({
			where: {
				representationId
			},
			update: representation,
			create: representation
		});
		context.log(`upserted representation with representationId: ${representationId}`);
	});
};
