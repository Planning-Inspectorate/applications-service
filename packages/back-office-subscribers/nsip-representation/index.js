const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-representation function`);
	const representationId = message.representationId;

	if (!representationId) {
		context.log(`skipping update as representationId is missing`);
		return;
	}

	if (!message.representedId) {
		context.log(`skipping update as representedId is missing`);
		return;
	}

	// Only create the service users if it doesn't already exist
	// We create this first so that the foreign key constraint doesn't fail
	await prismaClient.$executeRawUnsafe(serviceUserQuery, message.representedId);
	context.log(`created represented with serviceUserId ${message.representedId}`);

	if (message.representativeId) {
		await prismaClient.$executeRawUnsafe(serviceUserQuery, message.representativeId);
		context.log(`created representative with serviceUserId ${message.representativeId}`);
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
		attachmentIds: message.attachmentIds?.join(','),
		representedId: message.representedId,
		representativeId: message.representativeId,
		modifiedAt: new Date()
	};

	const { statement, parameters } = buildMergeQuery(
		'representation',
		'representationId',
		representation,
		context.bindingData.enqueuedTimeUtc
	);
	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`upserted representation with representationId ${representationId}`);
};

const serviceUserQuery = `
		MERGE INTO [dbo].[serviceUser] AS Target 
		USING (SELECT @P1 AS serviceUserId) AS Source
		ON Target.[serviceUserId] = Source.[serviceUserId]
		WHEN MATCHED THEN UPDATE SET Target.[serviceUserId] = Source.[serviceUserId]
		WHEN NOT MATCHED THEN INSERT ([serviceUserId]) VALUES (@P1);`;
