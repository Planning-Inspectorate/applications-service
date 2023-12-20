const { prismaClient } = require('../lib/prisma');
const { Prisma } = require('@prisma/client');

const getRepresentationById = async (representationId) => {
	return prismaClient.representation.findFirst({
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
				{ represented: { firstName: { contains: options.searchTerm } } },
				{ represented: { lastName: { contains: options.searchTerm } } },
				{ represented: { organisationName: { contains: options.searchTerm } } },
				{ representative: { firstName: { contains: options.searchTerm } } },
				{ representative: { lastName: { contains: options.searchTerm } } },
				{ representative: { organisationName: { contains: options.searchTerm } } },
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

	const representations = await prismaClient.representation.findMany({
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
	});

	const count = await prismaClient.representation.count({ where });
	return { representations, count };
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
