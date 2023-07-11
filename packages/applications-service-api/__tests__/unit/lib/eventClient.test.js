describe('eventClient', () => {
	describe('sendMessages', () => {
		let mockSendMessages;
		let mockCreateSender;
		let logger;
		let ServiceBusClient;
		let DefaultAzureCredential;

		beforeEach(() => {
			jest.resetModules();

			jest.mock('@azure/identity');
			jest.mock('../../../src/lib/logger');

			logger = require('../../../src/lib/logger');
			ServiceBusClient = require('@azure/service-bus').ServiceBusClient;
			DefaultAzureCredential = require('@azure/identity').DefaultAzureCredential;

			mockSendMessages = jest.fn();
			mockCreateSender = jest.fn().mockImplementation(() => ({
				sendMessages: mockSendMessages
			}));
			jest.mock('@azure/service-bus', () => {
				return {
					ServiceBusClient: jest.fn().mockImplementation(() => ({
						createSender: (topic) => mockCreateSender(topic)
					}))
				};
			});
		});

		it('invokes local client when service bus integration is disabled', async () => {
			jest.mock('../../../src/lib/config', () => ({
				backOfficeIntegration: {
					serviceBus: {
						enabled: false
					}
				},
				logger: {
					level: 'info'
				}
			}));
			const { sendMessages } = require('../../../src/lib/eventClient');

			await sendMessages('sometopic', [{ body: 'some message' }]);

			expect(logger.info).toBeCalledWith(
				'[Local Event Client] Simulating publishing messages to sometopic topic: [{"body":"some message"}]'
			);
		});

		it('invokes azure service bus when service bus integration is enabled', async () => {
			jest.mock('../../../src/lib/config', () => ({
				backOfficeIntegration: {
					serviceBus: {
						enabled: true,
						hostname: 'sb.example.com'
					}
				},
				logger: {
					level: 'info'
				}
			}));
			const { sendMessages } = require('../../../src/lib/eventClient');

			await sendMessages('sometopic', [{ body: 'some message' }]);

			expect(logger.info).toBeCalledWith(
				'[Azure Event Client] Publishing message to sometopic topic: [{"body":"some message"}]'
			);
			expect(ServiceBusClient).toBeCalledWith('sb.example.com', new DefaultAzureCredential());
			expect(mockCreateSender).toBeCalledWith('sometopic');
			expect(mockSendMessages).toBeCalledWith([{ body: 'some message' }]);
		});
	});
});
