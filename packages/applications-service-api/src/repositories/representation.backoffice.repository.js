const { prismaClient } = require('../lib/prisma');
const { Prisma } = require('@prisma/client');

const getRepresentationById = async (representationId) => {
	return await prismaClient.representation.findFirst({
		where: {
			representationId,
			status: {
				in: ['PUBLISHED', 'published']
			},
			represented: {
				isNot: null
			}
		},
		include: {
			represented: true,
			representative: true
		}
	});
};

const getRepresentations = async (options) => {
	const where = {
		AND: [
			{ caseReference: options.caseReference },
			{
				status: {
					in: ['PUBLISHED', 'published']
				}
			},
			{
				represented: {
					isNot: null
				}
			}
		]
	};

	if (options.searchTerm) {
		where['AND'].push({
			OR: [
				// Cant search in represented or representative as that would need to be in the `include` which would mean
				// we would not be able to include it in the `OR` query to search in the representationComment

				{ representationComment: { contains: options.searchTerm } }
			]
		});
	}
	if (options.type) {
		where['AND'].push({
			representationType: {
				in: options.type
			}
		});
	}

	const filters = {
		where,
		orderBy: {
			dateReceived: 'asc'
		},
		skip: options.offset,
		take: options.limit,
		include: {
			represented: true,
			representative: true
		}
	};

	const representations = await prismaClient.representation.findMany(filters);
	console.log({ representations });
	return { representations };
};

const getFilters = async (caseReference) => {
	const sql = Prisma.sql`
		SELECT DISTINCT(representationType), status, count(id) as total
		FROM Representation
		WHERE caseReference = ${caseReference}
		  AND (status = 'PUBLISHED' or status = 'published')
			AND representationType is not null
		GROUP BY representationType, status`;

	const filters = await prismaClient.$queryRaw(sql);
	return filters.map((filter) => ({
		name: filter.representationType,
		count: filter.total
	}));
};

module.exports = {
	getRepresentationById,
	getRepresentations,
	getFilters
};
