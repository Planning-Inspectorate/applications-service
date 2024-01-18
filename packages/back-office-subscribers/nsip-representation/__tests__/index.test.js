const sendMessage = require('../index');

const mockExecuteRawUnsafe = jest.fn();
jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$executeRawUnsafe: (statement, ...parameters) => mockExecuteRawUnsafe(statement, ...parameters)
	}
}));

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
	caseRef: 'CASE-REF',
	caseId: 123,
	referenceId: 'reference-id',
	status: 'published',
	dateReceived: new Date('2023-01-01T09:00:00.000Z'),
	redacted: false,
	redactedRepresentation: 'redacted-representation',
	originalRepresentation: 'original-representation',
	representationFrom: 'PERSON',
	representationType: 'Local Authorities',
	registerFor: 'ORGANISATION',
	representedId: 'represented-id',
	representativeId: 'representative-id',
	attachmentIds: ['123', '456']
};

const mockRepresentation = {
	representationId: mockMessage.representationId,
	caseReference: mockMessage.caseRef,
	caseId: mockMessage.caseId,
	referenceId: mockMessage.referenceId,
	status: mockMessage.status,
	dateReceived: mockMessage.dateReceived,
	representationComment: mockMessage.originalRepresentation,
	representationFrom: mockMessage.representationFrom,
	representationType: mockMessage.representationType,
	registerFor: mockMessage.registerFor,
	attachmentIds: mockMessage.attachmentIds.join(','),
	representedId: mockMessage.representedId,
	representativeId: mockMessage.representativeId,
	modifiedAt: new Date()
};

describe('nsip-representation', () => {
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
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-representation function');
	});
	it('skips update if representationId is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping update as representationId is missing');
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	describe('represented service user', () => {
		describe('when represented exists', () => {
			it('creates represented', async () => {
				await sendMessage(mockContext, mockMessage);
				expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(
					`
		MERGE INTO [dbo].[serviceUser] AS Target 
		USING (SELECT @P1 AS serviceUserId) AS Source
		ON Target.[serviceUserId] = Source.[serviceUserId]
		WHEN MATCHED THEN UPDATE SET Target.[serviceUserId] = Source.[serviceUserId]
		WHEN NOT MATCHED THEN INSERT ([serviceUserId]) VALUES (@P1);`,
					mockMessage.representedId
				);
				expect(mockContext.log).toHaveBeenCalledWith(
					`created represented with serviceUserId ${mockMessage.representedId}`
				);
			});
		});
		describe('when represented is missing', () => {
			it('does not create represented', async () => {
				await sendMessage(mockContext, { ...mockMessage, representedId: undefined });
				expect(mockExecuteRawUnsafe).not.toHaveBeenCalledWith(expect.anything(), 'represented-id');
			});
		});
	});

	describe('representative service user', () => {
		describe('when representative exists', () => {
			it('creates representative', async () => {
				await sendMessage(mockContext, mockMessage);
				expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(
					`
		MERGE INTO [dbo].[serviceUser] AS Target 
		USING (SELECT @P1 AS serviceUserId) AS Source
		ON Target.[serviceUserId] = Source.[serviceUserId]
		WHEN MATCHED THEN UPDATE SET Target.[serviceUserId] = Source.[serviceUserId]
		WHEN NOT MATCHED THEN INSERT ([serviceUserId]) VALUES (@P1);`,
					mockMessage.representativeId
				);
				expect(mockContext.log).toHaveBeenCalledWith(
					`created representative with serviceUserId ${mockMessage.representativeId}`
				);
			});
		});
		describe('when representative is missing', () => {
			it('does not create representative', async () => {
				await sendMessage(mockContext, { ...mockMessage, representativeId: undefined });
				expect(mockExecuteRawUnsafe).not.toHaveBeenCalledWith(
					expect.anything(),
					'representative-id'
				);
			});
		});
	});
	it('runs query to match upsert representation', async () => {
		await sendMessage(mockContext, mockMessage);
		const expectedStatement = `MERGE INTO [representation] AS Target
			USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14) AS Source ([representationId], [caseReference], [caseId], [referenceId], [status], [dateReceived], [representationComment], [representationFrom], [representationType], [registerFor], [attachmentIds], [representedId], [representativeId], [modifiedAt])
			ON Target.[representationId] = Source.[representationId]
			WHEN MATCHED 
			AND '2023-01-01 09:00:00' BETWEEN DATEADD(MINUTE, -1, Target.[modifiedAt]) AND DATEADD(MINUTE, 1, Target.[modifiedAt])
			THEN UPDATE SET Target.[caseReference] = Source.[caseReference], Target.[caseId] = Source.[caseId], Target.[referenceId] = Source.[referenceId], Target.[status] = Source.[status], Target.[dateReceived] = Source.[dateReceived], Target.[representationComment] = Source.[representationComment], Target.[representationFrom] = Source.[representationFrom], Target.[representationType] = Source.[representationType], Target.[registerFor] = Source.[registerFor], Target.[attachmentIds] = Source.[attachmentIds], Target.[representedId] = Source.[representedId], Target.[representativeId] = Source.[representativeId], Target.[modifiedAt] = Source.[modifiedAt]
			WHEN NOT MATCHED THEN INSERT ([representationId], [caseReference], [caseId], [referenceId], [status], [dateReceived], [representationComment], [representationFrom], [representationType], [registerFor], [attachmentIds], [representedId], [representativeId], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14);`;
		const expectedParameters = Object.values(mockRepresentation);
		expect(mockExecuteRawUnsafe).toHaveBeenNthCalledWith(
			3,
			expectedStatement,
			...expectedParameters
		);
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted representation with representationId ${mockMessage.representationId}`
		);
	});
});
