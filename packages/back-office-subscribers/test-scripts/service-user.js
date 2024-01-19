const sendServiceUserMessage = require('../nsip-service-user');

const context = {
	log: () => {},
	bindingData: {
		enqueuedTimeUtc: new Date().toUTCString()
	}
};

const generateNServiceUserMessages = (n, prefix) => {
	const serviceUsers = [];
	for (let i = 1; i <= n; i++) {
		let serviceUser = {
			id: `${prefix}-${i}`,
			firstName: 'Test',
			lastName: 'Tester',
			organisation: 'ACME',
			organisationType: 'Sole Trader',
			caseReference: 'B123456',
			emailAddress: 'test@test.com',
			webAddress: 'www.test.com',
			telephoneNumber: '0123456789',
			serviceUserType: 'RepresentationContact'
		};
		serviceUsers.push(serviceUser);
	}
	return serviceUsers;
};

async function run(n) {
	const representedServiceUserMessages = generateNServiceUserMessages(n, 'represented');
	const representativeServiceUserMessages = generateNServiceUserMessages(n, 'representative');
	const serviceUserMessages = [
		...representedServiceUserMessages,
		...representativeServiceUserMessages
	].map((message) => sendServiceUserMessage(context, message));

	await Promise.all(serviceUserMessages);
}

const num = process.argv[2] || 50;
run(num).catch((err) => console.error(err));
