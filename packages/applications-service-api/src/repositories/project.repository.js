const { createPrismaClient } = require('../lib/prisma');

const prismaClient = createPrismaClient();

const getByCaseReference = async (caseReference) => {
	return prismaClient.project.findUnique({
		where: {
			caseReference: caseReference
		}
	});
};

module.exports = {
	getByCaseReference
};
