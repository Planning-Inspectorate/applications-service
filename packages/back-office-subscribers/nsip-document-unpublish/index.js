const { prismaClient } = require('../lib/prisma');
const axios = require('axios');

module.exports = async (context, message) => {
	const documentId = message.documentId;
	const caseRef = message.caseRef;
	const examinationRefNo = message.examinationRefNo;
	const documentDescription = message.description;

	if (!documentId) {
		context.warn(`skipping nsip-document-unpublish function as documentId is missing`, {
			correlationId: message.correlationId,
			caseReference: caseRef
		});
		return;
	}

	context.log(
		`invoking nsip-document-unpublish function for documentId ${documentId} and caseRef ${caseRef}`
	);

	// if the document has an examination Ref number, update its status to unpublished to retain it in EL; otherwise delete it
	if (examinationRefNo) {
		await prismaClient.document.updateMany({
			where: { documentId },
			data: { publishedStatus: 'unpublished' }
		});
		context.log(
			`unpublished document for caseRef ${caseRef} with documentId: ${documentId} (retained due to EL reference)`
		);
	} else {
		await prismaClient.document.deleteMany({
			where: { documentId }
		});
		context.log(
			`deleted document for caseRef ${caseRef} with documentId: ${documentId} (no EL reference)`
		);
	}

	if (!caseRef) {
		context.log('skipping document cache clear as caseRef is required');
	} else {
		context.log(`clearing documents cache for caseRef ${caseRef}`);

		const cacheKeyPattern = `cache:${caseRef}:docs*`;
		const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

		const { data: cacheClearResponse } = await axios.delete(url);

		context.log(JSON.stringify(cacheClearResponse, null, 2));
		context.log(`documents cache cleared for caseRef ${caseRef}`);
	}

	if (documentDescription === 'Relevant representation attachment') {
		context.log(`deleting documentId: ${documentId} from representation attachmentIds`);

		const result = await prismaClient.representation.findFirst({
			where: {
				attachmentIds: {
					contains: documentId
				}
			}
		});

		if (!result) {
			throw new Error(`no representation found for documentId: ${documentId}`);
		}

		const representationId = result.representationId;
		const attachmentIds = result.attachmentIds ?? '';

		if (!representationId) {
			throw new Error('representationId is missing from representation');
		}

		if (!attachmentIds.split(',').includes(documentId)) {
			throw new Error('documentId cannot be deleted from representation');
		}

		let updatedAttachmentIds;

		if (attachmentIds === documentId) {
			updatedAttachmentIds = null;
		} else {
			updatedAttachmentIds = attachmentIds
				.split(',')
				.filter((item) => item !== documentId)
				.join(',');
		}

		await prismaClient.representation.update({
			where: {
				representationId: representationId
			},
			data: {
				attachmentIds: updatedAttachmentIds,
				modifiedAt: new Date()
			}
		});

		context.log(
			`deleted documentId: ${documentId} from representation with representationId: ${representationId}`
		);

		if (!caseRef) {
			context.log('skipping representations cache clear as caseRef is required');
		} else {
			context.log(`clearing representations cache for caseRef ${caseRef}`);

			const cacheKeyPattern = `cache:${caseRef}:reps*`;
			const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

			const { data: cacheClearResponse } = await axios.delete(url);

			context.log(JSON.stringify(cacheClearResponse, null, 2));
			context.log(`representations cache cleared for caseRef ${caseRef}`);
		}
	}
};
