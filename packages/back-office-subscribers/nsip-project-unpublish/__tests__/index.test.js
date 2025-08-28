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
	caseReference: 'mock-case-reference'
};

const mockProject = {
	...mockMessage,
	publishStatus: 'unpublished',
	modifiedAt: new Date()
};

describe('nsip-project-unpublish', () => {
	beforeEach(() => {
		mockExecuteRawUnsafe.mockReset();
	});

	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockProject.modifiedAt));
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project-unpublish function');
	});

	it('skips unpublish if caseReference is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping unpublish as caseReference is missing');
	});

	it('calls buildMergeQuery with correct parameters', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(buildMergeQuery).toHaveBeenCalledWith(
			'project',
			'caseReference',
			mockProject,
			mockEnqueueDateTime
		);
	});

	it('runs query to update publish status', async () => {
		await sendMessage(mockContext, mockMessage);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [project] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3) AS Source ([caseReference], [publishStatus], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[caseReference] = Source.[caseReference]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[publishStatus] = Source.[publishStatus], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([caseReference], [publishStatus], [modifiedAt]) VALUES (@P1, @P2, @P3);'
		);
		const expectedParameters = Object.values(mockProject);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`unpublished project with caseReference: ${mockMessage.caseReference}`
		);
	});
});
