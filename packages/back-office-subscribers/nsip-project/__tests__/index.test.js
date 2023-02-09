const subject = require('../index');

describe('nsip-project', () => {
	describe('index', () => {
		it('invokes log', async () => {
			const mockLog = jest.fn();
			const mockContext = {
				log: mockLog,
				bindingData: {
					enqueuedTimeUtc: 1,
					deliveryCount: 1,
					messageId: 123
				}
			};

			await subject(mockContext, 'some-message');

			expect(mockLog).toBeCalledWith('Message: some-message');
			expect(mockLog).toBeCalledWith('EnqueuedTimeUtc: 1');
			expect(mockLog).toBeCalledWith('DeliveryCount: 1');
			expect(mockLog).toBeCalledWith('MessageId: 123');
		});
	});
});
