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

const getAllApplications = async () => {
	return prismaClient.project.findMany({
		include: {
			applicant: true
		}
	});
};

module.exports = {
	getByCaseReference,
	getAllApplications
};
