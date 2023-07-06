const { PrismaClient } = require('@prisma/client');

let prismaClientInstance;

exports.createPrismaClient = () => {
	if (!prismaClientInstance) {
		prismaClientInstance = new PrismaClient({
			log: ['query', 'info', 'warn', 'error']
		});

	}

	return prismaClientInstance;
};
