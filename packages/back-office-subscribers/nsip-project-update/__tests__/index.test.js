const subject = require('../index');

describe('nsip-project-update', () => {
	const message = {
		id: 1,
		caseReference: 'BC0110001',
		updateDate: '2023-07-28',
		updateName: 'July Update',
		updateContentEnglish: 'this is an update',
		updateContentWelsh: 'diweddariad yw hwn',
		updateStatus: 'published'
	};

	beforeAll(() => jest.useFakeTimers());
	afterAll(() => jest.useRealTimers());

	describe('index', () => {
		it('assigns project update data to binding in correct format', async () => {
			const dateNow = new Date();
			jest.setSystemTime(dateNow);

			const mockContext = {
				log: jest.fn(),
				bindingData: {
					enqueuedTimeUtc: 1,
					deliveryCount: 1,
					messageId: 123
				},
				bindings: {
					projectUpdate: jest.fn()
				}
			};

			await subject(mockContext, message);

			const expectedProjectUpdate = {
				projectUpdateId: 1,
				caseReference: 'BC0110001',
				updateDate: '2023-07-28',
				updateName: 'July Update',
				updateContentEnglish: 'this is an update',
				updateContentWelsh: 'diweddariad yw hwn',
				updateStatus: 'published',
				modifiedAt: dateNow
			};

			expect(mockContext.bindings.projectUpdate).toEqual(expectedProjectUpdate);
			expect(mockContext.log).toBeCalledWith(
				`invoking nsip-project-update function with message: ${JSON.stringify(message)}`
			);
		});
	});
});
