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
	id: 1,
	caseReference: 'BC0110001',
	updateDate: '2023-07-28',
	updateName: 'July Update',
	updateContentEnglish: 'this is an update',
	updateContentWelsh: 'diweddariad yw hwn',
	updateStatus: 'published'
};

const mockProjectUpdate = {
	projectUpdateId: 1,
	caseReference: 'BC0110001',
	updateDate: '2023-07-28',
	updateName: 'July Update',
	updateContentEnglish: 'this is an update',
	updateContentWelsh: 'diweddariad yw hwn',
	updateStatus: 'published',
	modifiedAt: new Date()
};

describe('nsip-project-update', () => {
	beforeEach(() => {
		mockExecuteRawUnsafe.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockProjectUpdate.modifiedAt));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project-update function');
	});

	it('throws error if id is missing', async () => {
		const mockMessageWithoutId = { ...mockMessage };
		delete mockMessageWithoutId.id;
		await expect(sendMessage(mockContext, mockMessageWithoutId)).rejects.toThrow('id is required');
	});

	it('calls buildMergeQuery with correct parameters', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(buildMergeQuery).toHaveBeenCalledWith(
			'projectUpdate',
			'projectUpdateId',
			mockProjectUpdate,
			mockEnqueueDateTime
		);
	});

	it('runs query to upsert projectUpdate', async () => {
		await sendMessage(mockContext, mockMessage);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [projectUpdate] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8) AS Source ([projectUpdateId], [caseReference], [updateDate], [updateName], [updateContentEnglish], [updateContentWelsh], [updateStatus], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[projectUpdateId] = Source.[projectUpdateId]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[caseReference] = Source.[caseReference], Target.[updateDate] = Source.[updateDate], Target.[updateName] = Source.[updateName], Target.[updateContentEnglish] = Source.[updateContentEnglish], Target.[updateContentWelsh] = Source.[updateContentWelsh], Target.[updateStatus] = Source.[updateStatus], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([projectUpdateId], [caseReference], [updateDate], [updateName], [updateContentEnglish], [updateContentWelsh], [updateStatus], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8);'
		);
		const expectedParameters = Object.values(mockProjectUpdate);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted projectUpdate with projectUpdateId ${mockMessage.id}`
		);
	});
});
