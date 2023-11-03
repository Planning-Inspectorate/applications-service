const { prismaClient } = require('../lib/prisma');

module.exports = async (context, message) => {
	context.log(`invoking nsip-project-update function`);

	const projectUpdateId = message.id;

	if (!projectUpdateId) {
		context.log(`skipping update as projectUpdateId is missing`);
		return;
	}
	return await prismaClient.$transaction(async (tx) => {
		const existingProjectUpdate = await tx.projectUpdate.findUnique({
			where: {
				projectUpdateId
			}
		});

		const shouldUpdate =
			!existingProjectUpdate ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingProjectUpdate.modifiedAt.toUTCString());

		if (shouldUpdate) {
			const projectUpdate = {
				projectUpdateId,
				caseReference: message.caseReference,
				updateDate: message.updateDate,
				updateName: message.updateName,
				updateContentEnglish: message.updateContentEnglish,
				updateContentWelsh: message.updateContentWelsh,
				updateStatus: message.updateStatus,
				modifiedAt: new Date()
			};

			await tx.projectUpdate.upsert({
				where: {
					projectUpdateId
				},
				update: projectUpdate,
				create: projectUpdate
			});
			context.log(`upserted projectUpdate with projectUpdateId: ${projectUpdateId}`);
		} else {
			context.log(
				`skipping update of projectUpdate with projectUpdateId: ${projectUpdateId} as it is not newer than existing`
			);
		}
	});
};
