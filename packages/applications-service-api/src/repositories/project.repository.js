const { prismaClient } = require('../lib/prisma');

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
