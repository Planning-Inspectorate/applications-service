const { Prisma } = require('@prisma/client');
const { prismaClient } = require('../lib/prisma');

const getFilters = (caseReference) => {
	const sql = Prisma.sql`
		SELECT DISTINCT(stage), filter1, count(id) as total
		FROM Document
		WHERE caseRef = ${caseReference}
			AND (stage is not null and stage <> 'draft')
			AND filter1 is not null
		GROUP BY stage, filter1`;

	return prismaClient.$queryRaw(sql);
};

const getDocuments = async (query) => {
	let whereClause = {
		AND: [
			{ caseRef: query.caseReference },
			{
				AND: [{ stage: { not: { equals: null } } }, { stage: { not: { equals: 'draft' } } }]
			}
		]
	};

	if (query.searchTerm) {
		whereClause['AND'].push({
			OR: [
				{ description: { contains: query.searchTerm } },
				{ author: { contains: query.searchTerm } },
				{ representative: { contains: query.searchTerm } }
			]
		});
	}

	if (query.filters) {
		let filters = [];

		query.filters.forEach((filter) => {
			let filterStatement;
			switch (filter.name) {
				case 'stage':
					filterStatement = { AND: [{ ['stage']: filter.value }] };
					break;
				default:
					throw new Error(`Unexpected filter: ${filter}`);
			}

			if (filter.type && filter.type.length > 0)
				filterStatement['AND'].push({ filter1: { in: filter.type.map((type) => type.value) } });

			filters.push(filterStatement);
		});

		whereClause['AND'].push({
			OR: filters
		});
	}

	const rows = await prismaClient.document.findMany({
		where: whereClause
	});
	const count = await prismaClient.document.count({
		where: whereClause
	});

	return { rows, count };
};

const getDocumentsByType = async (queryData) =>
	await prismaClient.document.findFirst({
		where: {
			caseRef: queryData.caseReference,
			documentType: queryData.type
		},
		orderBy: {
			createdAt: 'desc'
		},
		take: 1
	});

const getDocumentsByIds = async (documentIds) => {
	if (!documentIds || documentIds.length === 0) return [];
	return prismaClient.document.findMany({
		where: {
			documentId: {
				in: documentIds?.split(',')
			}
		}
	});
};

module.exports = {
	getDocuments,
	getFilters,
	getDocumentsByType,
	getDocumentsByIds
};
