const { PrismaClient } = require('../../prisma/client/client.js');
const { isProduction } = require('./config');
const logger = require('./logger');
const { PrismaMssql } = require('@prisma/adapter-mssql');

const globalForPrisma = globalThis;

const createPrismaClient = () => {
	const logOption = isProduction
		? ['warn', 'error']
		: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error'];

	const prisma =
		globalForPrisma.prisma ||
		new PrismaClient({
			adapter: new PrismaMssql(process.env.DATABASE_URL),
			log: logOption
		});

	if (!isProduction && !globalForPrisma.prisma) {
		registerQueryLogger(prisma);
	}

	if (!isProduction) globalForPrisma.prisma = prisma;

	return prisma;
};

const registerQueryLogger = (prismaClient) => {
	prismaClient.$on('query', async (e) => {
		try {
			const params = JSON.parse(e.params);
			let sql = `${e.query}`;
			params.forEach((param, index) => {
				let value = typeof param === 'string' ? `'${param}'` : param;
				sql = sql.replace(`@P${index + 1}`, value);
			});
			logger.info(sql);
		} catch (e) {
			logger.error(e);
		}
	});
};

module.exports = { prismaClient: createPrismaClient() };
