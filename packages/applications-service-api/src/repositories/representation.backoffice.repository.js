const { prismaClient } = require('../lib/prisma');
const { Prisma } = require('@prisma/client');

const commonWhereFilters = {
	status: {
		in: ['PUBLISHED', 'published']
	},
	OR: [
		{
			AND: [
				{ represented: { firstName: { not: null } } },
				{ represented: { firstName: { not: '' } } }
			]
		},
		{
			AND: [
				{ represented: { lastName: { not: null } } },
				{ represented: { lastName: { not: '' } } }
			]
		},
		{
			AND: [
				{ represented: { organisationName: { not: null } } },
				{ represented: { organisationName: { not: '' } } }
			]
		}
	]
};

const getRepresentationById = async (representationId) => {
	return prismaClient.representation.findFirst({
		where: {
			representationId,
			...commonWhereFilters
		},
		include: {
			represented: true,
			representative: true
		}
	});
};

const getRepresentations = async (options) => {
	const where = {
		AND: [{ caseReference: options.caseReference }, commonWhereFilters]
	};

	if (options.searchTerm) {
		const terms = options.searchTerm.split(' ');
		where['AND'].push({
			OR: [
				{ representationComment: { contains: options.searchTerm } },
				{ representative: { organisationName: { contains: options.searchTerm } } },
				{ represented: { organisationName: { contains: options.searchTerm } } },
				...terms.map((term) => ({
					OR: [
						{ represented: { firstName: { contains: term } } },
						{ represented: { lastName: { contains: term } } },
						{ representative: { firstName: { contains: term } } },
						{ representative: { lastName: { contains: term } } }
					]
				}))
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

	const options = await prismaClient.$queryRaw(sql);
	return options.map((filter) => ({
		name: filter.representationType,
		count: filter.total
	}));
};

module.exports = {
	getRepresentationById,
	getRepresentations,
	getFilters
};
