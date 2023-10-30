const { PrismaClient } = require('@prisma/client');

let prismaClientInstance;

const createPrismaClient = () => {
	if (!prismaClientInstance) {
		prismaClientInstance = new PrismaClient({
			log: ['query', 'info', 'warn', 'error']
		});
	}

	return prismaClientInstance;
};

module.exports = { prismaClient: createPrismaClient() };
