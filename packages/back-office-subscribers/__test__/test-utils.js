const { prismaClient } = require('../lib/prisma');

const deleteServiceUser = async (serviceUserId) => {
	await prismaClient.project.updateMany({
		where: {
			applicantId: serviceUserId
		},
		data: {
			applicantId: null
		}
	});

	await prismaClient.serviceUser.deleteMany({
		where: {
			serviceUserId: serviceUserId
		}
	});
};

const getServiceUser = async (serviceUserId) => {
	return prismaClient.serviceUser.findUnique({
		where: {
			serviceUserId: serviceUserId
		}
	});
};

const createServiceUser = async (serviceUserId) => {
	return prismaClient.serviceUser.create({
		data: {
			serviceUserId: serviceUserId
		}
	});
};

const createProject = async (caseReference, applicantId) => {
	return prismaClient.project.create({
		data: {
			caseReference: caseReference,
			applicantId: applicantId,
			caseId: 123
		}
	});
};

const getProject = async (caseReference) => {
	return prismaClient.project.findUnique({
		where: {
			caseReference: caseReference
		}
	});
};

const deleteProject = async (caseReference) => {
	return prismaClient.project.deleteMany({
		where: {
			caseReference: caseReference
		}
	});
};

module.exports = {
	deleteServiceUser,
	getServiceUser,
	createServiceUser,
	createProject,
	getProject,
	deleteProject
};
