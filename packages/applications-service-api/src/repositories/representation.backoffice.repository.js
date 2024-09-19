const { prismaClient } = require('../lib/prisma');
const { repFromToWelsh } = require('../utils/representation.mapper');

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
		const searchTerm = options.searchTerm.trim().split(' ');
		const firstPart = searchTerm[0];
		const lastPart = searchTerm[1] || '';

		// Common base query
		const baseConditions = [
			{ representationComment: { contains: options.searchTerm } },
			{ representative: { organisationName: { contains: options.searchTerm } } },
			{ represented: { organisationName: { contains: options.searchTerm } } }
		];

		// name queries
		const nameConditions = lastPart
			? [
					{ represented: { firstName: { contains: firstPart } } },
					{ represented: { lastName: { contains: lastPart } } },
					{ representative: { firstName: { contains: firstPart } } },
					{ representative: { lastName: { contains: lastPart } } }
			  ]
			: [
					{ represented: { firstName: { contains: firstPart } } },
					{ represented: { lastName: { contains: firstPart } } },
					{ representative: { firstName: { contains: firstPart } } },
					{ representative: { lastName: { contains: firstPart } } }
			  ];

		where['AND'].push({
			OR: [...baseConditions, { OR: nameConditions }]
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
	const options = await prismaClient.representation.groupBy({
		by: ['representationType', 'status'],
		where: {
			caseReference,
			representationType: {
				not: null
			},
			...commonWhereFilters
		},
		_count: {
			id: true
		}
	});

	return options.map((option) => ({
		name: option.representationType,
		name_cy: repFromToWelsh(option.representationType),
		count: option._count.id
	}));
};

module.exports = {
	getRepresentationById,
	getRepresentations,
	getFilters
};
