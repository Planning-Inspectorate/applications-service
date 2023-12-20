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
	return prismaClient.representation.findMany({
		where: {
			caseReference: options.caseReference,
			status: {
				in: ['PUBLISHED', 'published']
			}
		}
	});
};

module.exports = {
	getRepresentationById,
	getRepresentationsByCaseReference
};
