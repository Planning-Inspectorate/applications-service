const { prismaClient } = require('../lib/prisma');

const getServiceUserById = async (serviceUserId) => {
	return prismaClient.serviceUser.findUnique({
		where: {
			serviceUserId
		}
	});
};

module.exports = {
	getServiceUserById
};
