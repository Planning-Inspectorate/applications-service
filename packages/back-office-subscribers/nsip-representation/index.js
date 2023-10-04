module.exports = async (context, message) => {
	context.log(`invoking nsip-representation function with message: ${JSON.stringify(message)}`);

	const hasAttachments = message.attachments && message.attachments.length > 0;

	if (hasAttachments) {
		context.bindings.document = message.attachments.map((attachment) => ({
			documentId: attachment.documentId,
			representationId: message.representationId
		}));
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

	context.bindings.representation = representation;
};
