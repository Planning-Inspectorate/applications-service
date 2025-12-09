const { PrismaClient } = require('./prisma-client/client.js');
const { PrismaMssql } = require('@prisma/adapter-mssql');

let prismaClientInstance;

const createPrismaClient = () => {
	if (!prismaClientInstance) {
		prismaClientInstance = new PrismaClient({
			adapter: new PrismaMssql(process.env.DATABASE_URL),
			log: ['query', 'info', 'warn', 'error']
		});
	}

	return prismaClientInstance;
};

module.exports = { prismaClient: createPrismaClient() };
