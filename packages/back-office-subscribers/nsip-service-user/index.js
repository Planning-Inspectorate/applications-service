const { prismaClient } = require('../lib/prisma');
const buildMergeQuery = require('../lib/build-merge-query');

module.exports = async (context, message) => {
	context.log(`invoking nsip-service-user function`);
	const serviceUserId = message.id;

	if (!serviceUserId) {
		throw new Error(`serviceUserId is required`);
	}

	const serviceUser = mapMessageToServiceUser(message);
	const { statement, parameters } = buildMergeQuery(
		'serviceUser',
		'serviceUserId',
		serviceUser,
		context.bindingData.enqueuedTimeUtc
	);
	await prismaClient.$executeRawUnsafe(statement, ...parameters);
	context.log(`updated serviceUser with serviceUserId ${serviceUserId}`);
};

const mapMessageToServiceUser = (message) => {
	const serviceUserType = message.serviceUserType;
	switch (serviceUserType) {
		case 'Applicant':
			return {
				serviceUserId: message.id,
				firstName: message.firstName,
				lastName: message.lastName,
				organisationName: message.organisation,
				caseReference: message.caseReference,
				serviceUserType: message.serviceUserType,
				email: message.emailAddress,
				webAddress: message.webAddress,
				phoneNumber: message.telephoneNumber,
				modifiedAt: new Date()
			};
		case 'RepresentationContact':
			return {
				serviceUserId: message.id,
				firstName: message.firstName,
				lastName: message.lastName,
				organisationName: message.organisation,
				caseReference: message.caseReference,
				serviceUserType: message.serviceUserType,
				modifiedAt: new Date()
			};
		default:
			throw new Error(`Invalid serviceUserType: ${serviceUserType}`);
	}
};
