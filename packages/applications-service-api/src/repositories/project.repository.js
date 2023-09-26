const { prismaClient } = require('@pins/common/src/lib/prisma');

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
