const { PrismaClient } = require('@prisma/client');

let prismaClientInstance;

exports.createPrismaClient = () => {
	if (!prismaClientInstance) prismaClientInstance = new PrismaClient();

	return prismaClientInstance;
};
