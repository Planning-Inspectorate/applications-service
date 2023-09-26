const { prismaClient } = require('@pins/common/src/lib/prisma');

const getProjectUpdates = async (caseReference) =>
	prismaClient.projectUpdate.findMany({
		where: {
			caseReference: caseReference
		},
		orderBy: {
			updateDate: 'desc'
		}
	});

const deleteProjectUpdate = async (projectUpdateId) =>
	prismaClient.projectUpdate.delete({
		where: {
			projectUpdateId: projectUpdateId
		}
	});

module.exports = {
	getProjectUpdates,
	deleteProjectUpdate
};
