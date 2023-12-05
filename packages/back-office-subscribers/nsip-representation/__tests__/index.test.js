const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockRepresentationFindUnique = jest.fn();
const mockRepresentationUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				representation: {
					findUnique: mockRepresentationFindUnique,
					upsert: mockRepresentationUpsert
				}
			})
		)
	}
}));

const mockCurrentTime = new Date('2023-01-01T09:00:00.000Z');
const mockPastTime = new Date('2023-01-01T08:00:00.000Z');
const mockFutureTime = new Date('2023-01-01T10:00:00.000Z');
const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: mockCurrentTime.toUTCString(),
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
	attachmentIds: ['123']
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
	representedId: mockMessage.representedId,
	representativeId: mockMessage.representativeId,
	attachmentIds: mockMessage.attachmentIds.join(','),
	modifiedAt: mockCurrentTime
};

const assertRepresentationUpsert = (representation) => {
	expect(mockRepresentationUpsert).toHaveBeenCalledWith({
		where: {
			representationId: mockMessage.representationId
		},
		update: representation,
		create: representation
	});
	expect(mockContext.log).toHaveBeenCalledWith(
		`upserted representation with representationId: ${mockMessage.representationId}`
	);
};
describe('nsip-representation', () => {
	beforeEach(() => {
		mockRepresentationFindUnique.mockReset();
		mockRepresentationUpsert.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(mockCurrentTime);
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
		expect(mockRepresentationFindUnique).not.toHaveBeenCalled();
	});
	it('start transaction', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(prismaClient.$transaction).toHaveBeenCalled();
	});
	it('finds existing representation to determine if it should update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockRepresentationFindUnique).toHaveBeenCalledWith({
			where: {
				representationId: mockMessage.representationId
			}
		});
	});
	describe('when no representation exists in database', () => {
		it('creates new representation for representationId', async () => {
			mockRepresentationFindUnique.mockResolvedValue(null);
			await sendMessage(mockContext, mockMessage);
			assertRepresentationUpsert(mockRepresentation);
		});
	});
	describe('when representation exists in database', () => {
		describe('and the message is older than existing representation', () => {
			it('skips update', async () => {
				mockRepresentationFindUnique.mockResolvedValue(mockRepresentation);
				const mockContextWithOlderTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: mockPastTime.toUTCString()
					}
				};
				await sendMessage(mockContextWithOlderTime, mockMessage);
				expect(mockRepresentationUpsert).not.toHaveBeenCalled();
				expect(mockContext.log).toHaveBeenCalledWith(
					`skipping update of representation with representationId: ${mockMessage.representationId}`
				);
			});
		});
		describe('and the message is newer than existing project', () => {
			const mockContextWithNewerTime = {
				...mockContext,
				bindingData: {
					...mockContext.bindingData,
					enqueuedTimeUtc: mockFutureTime.toUTCString()
				}
			};
			it('updates representation', async () => {
				mockRepresentationFindUnique.mockResolvedValue(mockRepresentation);
				await sendMessage(mockContextWithNewerTime, mockMessage);
				assertRepresentationUpsert(mockRepresentation);
			});
		});
	});
	describe('representationComment is set correctly', () => {
		beforeEach(() => {
			mockRepresentationFindUnique.mockResolvedValue(null);
		});
		describe('when redacted is true', () => {
			it('sets representationComment to redactedRepresentation', async () => {
				const mockMessageWithRedacted = {
					...mockMessage,
					redacted: true
				};
				const mockRepresentationWithRedacted = {
					...mockRepresentation,
					representationComment: mockMessageWithRedacted.redactedRepresentation
				};
				await sendMessage(mockContext, mockMessageWithRedacted);
				assertRepresentationUpsert(mockRepresentationWithRedacted);
			});
		});
		describe('when redacted is false', () => {
			it('sets representationComment to originalRepresentation', async () => {
				const mockMessageWithRedactedFalse = {
					...mockMessage,
					redacted: false
				};
				const mockRepresentationWithRedactedFalse = {
					...mockRepresentation,
					representationComment: mockMessageWithRedactedFalse.originalRepresentation
				};
				await sendMessage(mockContext, mockMessageWithRedactedFalse);
				assertRepresentationUpsert(mockRepresentationWithRedactedFalse);
			});
		});
	});
});
