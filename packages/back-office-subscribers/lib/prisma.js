const { PrismaClient } = require('@prisma/client');

let prismaClientInstance;

const createPrismaClient = () => {
	if (!prismaClientInstance) {
		prismaClientInstance = new PrismaClient({
			log: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error']
		});
	}

	return prismaClientInstance;
};

module.exports = { prismaClient: createPrismaClient() };
