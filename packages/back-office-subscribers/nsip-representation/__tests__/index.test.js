const sendMessage = require('../index');
const { serviceUserQuery } = require('../../lib/queries');
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
	it('throws error if representationId is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'representationId is required'
		);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('throws error if representedId is missing', async () => {
		await expect(
			async () => await sendMessage(mockContext, { ...mockMessage, representedId: undefined })
		).rejects.toThrow('representedId is required');
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	describe('represented service user', () => {
		describe('when represented exists', () => {
			it('creates represented', async () => {
				await sendMessage(mockContext, mockMessage);
				expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(
					serviceUserQuery,
					mockMessage.representedId
				);
				expect(mockContext.log).toHaveBeenCalledWith(
					`created represented with serviceUserId ${mockMessage.representedId}`
				);
			});
		});
	});

	describe('representative service user', () => {
		describe('when representative exists', () => {
			it('creates representative', async () => {
				await sendMessage(mockContext, mockMessage);
				expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(
					serviceUserQuery,
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
	describe('representationComment mapping', () => {
		const baseMessage = {
			...mockMessage,
			originalRepresentation: 'ORIGINAL',
			editedRepresentation: null,
			redactedRepresentation: null,
			redacted: false
		};
		const getLastMergeParams = () => {
			const [, ...receivedParams] = mockExecuteRawUnsafe.mock.calls[2];
			return receivedParams;
		};
		it('uses original when no edit and not redacted', async () => {
			const message = { ...baseMessage };
			await sendMessage(mockContext, message);
			const mergeParams = getLastMergeParams();
			const representationComment = mergeParams[6];
			expect(representationComment).toBe('ORIGINAL');
		});
		it('uses edited when edited and not redacted', async () => {
			const message = {
				...baseMessage,
				editedRepresentation: 'EDITED'
			};
			await sendMessage(mockContext, message);
			const mergeParams = getLastMergeParams();
			const representationComment = mergeParams[6];
			expect(representationComment).toBe('EDITED');
		});
		it('uses redacted when redacted and no edit', async () => {
			const message = {
				...baseMessage,
				redacted: true,
				redactedRepresentation: 'REDACTED'
			};
			await sendMessage(mockContext, message);
			const mergeParams = getLastMergeParams();
			const representationComment = mergeParams[6];
			expect(representationComment).toBe('REDACTED');
		});
		it('uses redacted when both redacted and edited', async () => {
			const message = {
				...baseMessage,
				editedRepresentation: 'EDITED',
				redacted: true,
				redactedRepresentation: 'REDACTED'
			};
			await sendMessage(mockContext, message);
			const mergeParams = getLastMergeParams();
			const representationComment = mergeParams[6];
			expect(representationComment).toBe('REDACTED');
		});
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
	it('runs query to match upsert representation', async () => {
		await sendMessage(mockContext, mockMessage);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[2];
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [representation] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14) AS Source ([representationId], [caseReference], [caseId], [referenceId], [status], [dateReceived], [representationComment], [representationFrom], [representationType], [registerFor], [attachmentIds], [representedId], [representativeId], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[representationId] = Source.[representationId]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[caseReference] = Source.[caseReference], Target.[caseId] = Source.[caseId], Target.[referenceId] = Source.[referenceId], Target.[status] = Source.[status], Target.[dateReceived] = Source.[dateReceived], Target.[representationComment] = Source.[representationComment], Target.[representationFrom] = Source.[representationFrom], Target.[representationType] = Source.[representationType], Target.[registerFor] = Source.[registerFor], Target.[attachmentIds] = Source.[attachmentIds], Target.[representedId] = Source.[representedId], Target.[representativeId] = Source.[representativeId], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([representationId], [caseReference], [caseId], [referenceId], [status], [dateReceived], [representationComment], [representationFrom], [representationType], [registerFor], [attachmentIds], [representedId], [representativeId], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14);'
		);
		const expectedParameters = Object.values(mockRepresentation);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted representation with representationId ${mockMessage.representationId}`
		);
	});
});
