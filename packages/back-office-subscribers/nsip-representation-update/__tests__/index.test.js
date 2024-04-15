const sendMessage = require('../index');
const buildMergeQuery = require('../../lib/build-merge-query');

const mockExecuteRawUnsafe = jest.fn();
jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$executeRawUnsafe: (statement, ...parameters) => mockExecuteRawUnsafe(statement, ...parameters)
	}
}));
jest.mock('../../lib/build-merge-query', () =>
	jest.fn().mockImplementation(jest.requireActual('../../lib/build-merge-query'))
);

const mockEnqueueDateTime = new Date('2023-01-01T09:00:00.000Z').toUTCString();
const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: mockEnqueueDateTime,
		deliveryCount: 1,
		messageId: 123
	}
};

const mockMessage = {
	representationId: 123,
	status: 'PUBLISHED'
};

const mockRepresentation = {
	...mockMessage,
	modifiedAt: new Date()
};
describe('nsip-representation-update', () => {
	beforeEach(() => {
		mockExecuteRawUnsafe.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockRepresentation.modifiedAt));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-representation-update function');
	});

	it('throws error if representationId is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'representationId is required'
		);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('throws error if status is missing', async () => {
		await expect(
			async () => await sendMessage(mockContext, { representationId: 123 })
		).rejects.toThrow('status is required');
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('calls buildMergeQuery with correct parameters', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(buildMergeQuery).toHaveBeenCalledWith(
			'representation',
			'representationId',
			mockRepresentation,
			mockEnqueueDateTime
		);
	});

	it('runs query to update representation status', async () => {
		await sendMessage(mockContext, mockMessage);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [representation] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3) AS Source ([representationId], [status], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[representationId] = Source.[representationId]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[status] = Source.[status], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([representationId], [status], [modifiedAt]) VALUES (@P1, @P2, @P3);'
		);
		const expectedParameters = Object.values(mockRepresentation);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted representation with representationId ${mockMessage.representationId}`
		);
	});
});
