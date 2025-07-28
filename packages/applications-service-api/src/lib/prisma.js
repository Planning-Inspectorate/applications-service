const { PrismaClient } = require('@prisma/client');
const { isProduction } = require('./config');
const logger = require('./logger');

let prismaClientInstance;

const createPrismaClient = () => {
	const logOption = isProduction
		? ['warn', 'error']
		: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error'];

	if (!prismaClientInstance) {
		prismaClientInstance = new PrismaClient({
			log: logOption
		});
	}

	if (!isProduction) registerQueryLogger(prismaClientInstance);

	return prismaClientInstance;
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
