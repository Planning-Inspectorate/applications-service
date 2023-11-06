const { prismaClient } = require('../lib/prisma');

const getProjectUpdates = async (caseReference) =>
	prismaClient.projectUpdate.findMany({
		where: {
			caseReference: caseReference
		},
		orderBy: {
			updateDate: 'desc'
		}
	});

module.exports = {
	getProjectUpdates
};
