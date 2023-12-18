const { prismaClient } = require('../lib/prisma');

const getRepresentationById = async (representationId) => {
	return prismaClient.representation.findUnique({
		where: {
			representationId,
			status: {
				in: ['PUBLISHED', 'published']
			}
		}
	});
};

const getRepresentationsByCaseReference = async (options) => {
	// todo add relations, add searchTerm, add type
	const where = {
		caseReference: options.caseReference,
		status: {
			in: ['PUBLISHED', 'published']
		},
		representedId: {
			not: null
		}
	};
	const representations = await prismaClient.representation.findMany({
		where,
		orderBy: {
			dateReceived: 'asc'
		}
	});
	const count = await prismaClient.representation.count({
		where
	});
	return { count, representations };
};

module.exports = {
	getRepresentationById,
	getRepresentationsByCaseReference
};
