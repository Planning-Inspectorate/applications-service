const { prismaClient } = require('../lib/prisma');
const { repFromToWelsh } = require('../utils/representation.mapper');
const stopWords = require('../utils/stopwords');
const stopWordList = stopWords.english;

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
		const terms = options.searchTerm
			.split(' ')
			.filter((term) => !stopWordList.includes(term.toLowerCase()));

		// Match all terms in either the representationComment or organizationName fields
		where['AND'].push({
			OR: [
				// All terms must match in the representationComment field
				{
					AND: terms.map((term) => ({
						representationComment: { contains: term }
					}))
				},
				// All terms must match in the representative.organisationName field
				{
					AND: terms.map((term) => ({
						representative: { organisationName: { contains: term } }
					}))
				},
				// All terms must match in the represented.organisationName field
				{
					AND: terms.map((term) => ({
						represented: { organisationName: { contains: term } }
					}))
				},
				// Match any term in the firstName or lastName fields
				{
					OR: terms.flatMap((term) => [
						{ represented: { firstName: { contains: term } } },
						{ represented: { lastName: { contains: term } } },
						{ representative: { firstName: { contains: term } } },
						{ representative: { lastName: { contains: term } } }
					])
				}
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
			dateReceived: 'desc'
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
