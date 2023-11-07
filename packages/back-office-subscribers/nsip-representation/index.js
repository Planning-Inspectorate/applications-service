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
		const hasAttachments = message.attachments && message.attachments.length > 0;
		if (hasAttachments) {
			for (const attachment of message.attachments) {
				await tx.document.upsert({
					where: {
						documentId: attachment.documentId
					},
					update: {
						documentId: attachment.documentId,
						representationId
					},
					create: {
						documentId: attachment.documentId,
						representationId
					}
				});
			}
		}
		let representation = {
			representationId: message.representationId,
			referenceId: message.referenceId,
			caseReference: message.caseRef,
			caseId: message.caseId,
			status: message.status,
			dateReceived: message.dateReceived,
			originalRepresentation: message.originalRepresentation,
			redacted: message.redacted,
			redactedRepresentation: message.redactedRepresentation,
			redactedBy: message.redactedBy,
			redactedNotes: message.redactedNotes,
			representationFrom: message.representationFrom,
			representationType: message.representationType,
			registerFor: message.registerFor,
			hasAttachments: hasAttachments,
			modifiedAt: new Date()
		};

		if (message.representative) {
			representation = {
				...representation,
				representativeFirstName: message.representative.firstName,
				representativeLastName: message.representative.lastName,
				representativeUnder18: message.representative.under18,
				representativeOrganisationName: message.representative.organisationName
			};
		}

		if (message.represented) {
			representation = {
				...representation,
				representedFirstName: message.represented.firstName,
				representedLastName: message.represented.lastName,
				representedUnder18: message.represented.under18,
				representedOrganisationName: message.represented.organisationName
			};
		}

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
