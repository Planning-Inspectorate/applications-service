const axios = require('axios');
const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	const { caseReference, examinationDocuments } = message ?? {};

	if (!caseReference || !Array.isArray(examinationDocuments) || !examinationDocuments.length) {
		throw new Error('Invalid examination library publish message');
	}

	for (const document of examinationDocuments) {
		if (
			!document?.documentGuid ||
			!document?.documentExaminationReference ||
			!document?.categoryCode ||
			!document?.categoryName
		) {
			throw new Error('Missing required examination library document properties');
		}
	}

	context.log(`invoking nsip-examination-library function for caseRef ${caseReference}`);

	await prismaClient.$transaction(async (tx) => {
		for (const document of examinationDocuments) {
			const result = await tx.document.updateMany({
				where: {
					documentId: document.documentGuid,
					caseRef: caseReference
				},
				data: {
					examinationRefNo: document.documentExaminationReference,
					examinationCategoryCode: document.categoryCode,
					examinationCategoryName: document.categoryName,
					examinationCategoryPublishedStatus: 'published',
					modifiedAt: new Date()
				}
			});

			if (result.count !== 1) {
				throw new Error(`Document ${document.documentGuid} not found for caseRef ${caseReference}`);
			}
		}
	});

	context.log(
		`Updated ${examinationDocuments.length} examination library documents for caseRef ${caseReference}`
	);

	const cacheKeyPattern = `cache:${caseReference}:docs*`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`Documents cache cleared for caseRef ${caseReference}`);
};
