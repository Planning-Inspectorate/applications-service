const { prismaClient } = require('../lib/prisma');

const getRepresentationById = async (representationId) => {
	return prismaClient.representation.findUnique({
		where: {
			representationId
		}
	});
};

module.exports = {
	getRepresentationById
};
