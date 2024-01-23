const { prismaClient } = require('../lib/prisma');

async function run() {
	await prismaClient.representation.deleteMany();
	await prismaClient.serviceUser.deleteMany({
		where: {
			OR: [
				{
					serviceUserType: null
				},
				{
					serviceUserType: 'RepresentationContact'
				}
			]
		}
	});
}

run().catch((err) => console.error(err));
