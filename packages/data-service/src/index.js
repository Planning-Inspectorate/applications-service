const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProjectCount = async () => {
	return prisma.project.count();
};

module.exports = {
	getProjectCount
};
