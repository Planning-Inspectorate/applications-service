const { prismaClient } = require('../lib/prisma');
module.exports = async (context, message) => {
	context.log(`invoking nsip-service-user function`);
	const serviceUserId = message.id;

	if (!serviceUserId) {
		context.log(`skipping update as serviceUserId is missing`);
		return;
	}

	return await prismaClient.$transaction(async (tx) => {
		const existingServiceUser = await tx.serviceUser.findUnique({
			where: {
				serviceUserId
			}
		});

		const shouldUpdate =
			!existingServiceUser ||
			new Date(context.bindingData.enqueuedTimeUtc) >
				new Date(existingServiceUser.modifiedAt.toUTCString());

		if (shouldUpdate) {
			const serviceUserType = message.serviceUserType;

			const serviceUser = mapMessageToServiceUser(message);
			await tx.serviceUser.upsert({
				where: {
					serviceUserId
				},
				update: serviceUser,
				create: serviceUser
			});

			context.log(
				`upserted service user of type ${serviceUserType} with serviceUserId: ${serviceUserId}`
			);
		} else {
			context.log(`skipping update of service user with serviceUserId: ${serviceUserId}`);
		}
	});
};

const mapMessageToServiceUser = (message) => {
	const serviceUserType = message.serviceUserType;
	if (!['Representative', 'Represented', 'Applicant'].includes(serviceUserType)) {
		throw new Error(`Invalid serviceUserType: ${serviceUserType}`);
	}
	if (serviceUserType === 'Representative' || serviceUserType === 'Represented') {
		return {
			serviceUserId: message.id,
			firstName: message.firstName,
			lastName: message.lastName,
			organisationName: message.organisation,
			caseReference: message.caseReference,
			serviceUserType: message.serviceUserType
		};
	} else {
		return {
			serviceUserId: message.id,
			firstName: message.firstName,
			lastName: message.lastName,
			organisationName: message.organisation,
			caseReference: message.caseReference,
			serviceUserType: message.serviceUserType,
			email: message.emailAddress,
			webAddress: message.webAddress,
			phoneNumber: message.telephoneNumber
		};
	}
};
