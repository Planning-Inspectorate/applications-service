const { ServiceBusClient } = require('@azure/service-bus');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./config');
const logger = require('./logger');

const createAzureEventClient = () => ({
	sendMessages: async (topic, messages) => {
		logger.info(
			`[Azure Event Client] Publishing message to ${topic} topic: ${JSON.stringify(messages)}`
		);
		const client = new ServiceBusClient(
			config.backOfficeIntegration.serviceBus.hostname,
			new DefaultAzureCredential()
		);
		return client.createSender(topic).sendMessages(messages);
	}
});

const createLocalEventClient = () => ({
	sendMessages: (topic, messages) =>
		logger.info(
			`[Local Event Client] Simulating publishing messages to ${topic} topic: ${JSON.stringify(
				messages
			)}`
		)
});

const client = config.backOfficeIntegration.serviceBus.enabled
	? createAzureEventClient()
	: createLocalEventClient();

const sendMessages = async (topic, messages) => client.sendMessages(topic, messages);

module.exports = {
	sendMessages
};
