const axios = require('axios');
const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	const { caseReference, categories } = message ?? {};

	if (!caseReference || !Array.isArray(categories) || !categories.length) {
		throw new Error('Invalid examination library unpublish message');
	}

	if (categories.some((category) => typeof category !== 'string' || !category.trim())) {
		throw new Error('Missing required examination library category code');
	}

	context.log(`invoking nsip-examination-library-unpublish function for caseRef ${caseReference}`);

	const result = await prismaClient.document.updateMany({
		where: {
			caseRef: caseReference,
			examinationCategoryCode: {
				in: categories
			},
			examinationCategoryPublishedStatus: 'published'
		},
		data: {
			examinationCategoryPublishedStatus: 'unpublished',
			modifiedAt: new Date()
		}
	});

	context.log(`Updated ${result.count} examination library documents for caseRef ${caseReference}`);
	context.log(`Clearing documents cache for caseRef ${caseReference}`);

	const cacheKeyPattern = `cache:${caseReference}:docs*`;
	const url = `${process.env.APPLICATIONS_SERVICE_API_URL}/api/v1/cache/clear?pattern=${cacheKeyPattern}`;

	const { data: cacheClearResponse } = await axios.delete(url);

	context.log(JSON.stringify(cacheClearResponse, null, 2));
	context.log(`Documents cache cleared for caseRef ${caseReference}`);
};
