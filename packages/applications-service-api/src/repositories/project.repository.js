const { prismaClient } = require('../lib/prisma');

const getByCaseReference = async (caseReference) => {
	return prismaClient.project.findUnique({
		where: {
			caseReference: caseReference
		},
		include: {
			applicant: true
		}
	});
};

module.exports = {
	getByCaseReference
};
