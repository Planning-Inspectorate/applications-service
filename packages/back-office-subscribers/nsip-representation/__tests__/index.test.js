const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockRepresentationFindUnique = jest.fn();
const mockRepresentationUpsert = jest.fn();
const mockDocumentUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				representation: {
					findUnique: mockRepresentationFindUnique,
					upsert: mockRepresentationUpsert
				},
				document: {
					upsert: mockDocumentUpsert
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
	attachments: [
		{
			documentId: '8e706443-3404-4b89-9fda-280ab7fd6b68'
		}
	],
	caseRef: 'BC0110001',
	caseId: 151,
	dateReceived: '2023-08-11T10:52:56.516Z',
	examinationLibraryRef: '',
	originalRepresentation: 'some rep text secret stuff',
	redacted: true,
	redactedBy: 'Bloggs, Joe',
	redactedNotes: 'some notes here',
	redactedRepresentation: 'some rep text',
	referenceId: 'BC0110001-55',
	registerFor: 'ORGANISATION',
	representationFrom: 'AGENT',
	representationId: 6409,
	representationType: null,
	representative: {
		id: 6409,
		contactMethod: 'email',
		emailAddress: 'joe@example.com',
		firstName: 'joe',
		lastName: 'bloggs',
		organisationName: 'agent company',
		telephone: '01234 567891',
		under18: false,
		jobTitle: 'Engineer'
	},
	represented: {
		id: 6410,
		contactMethod: 'email',
		emailAddress: 'jane@example.com',
		firstName: 'jane',
		lastName: 'bloggs',
		telephone: '01234 567890',
		under18: false
	},
	status: 'VALID'
};

const mockRepresentation = {
	representationId: mockMessage.representationId,
	caseId: mockMessage.caseId,
	caseReference: mockMessage.caseRef,
	referenceId: mockMessage.referenceId,
	status: mockMessage.status,
	dateReceived: mockMessage.dateReceived,
	originalRepresentation: mockMessage.originalRepresentation,
	redacted: mockMessage.redacted,
	redactedBy: mockMessage.redactedBy,
	redactedNotes: mockMessage.redactedNotes,
	redactedRepresentation: mockMessage.redactedRepresentation,
	registerFor: mockMessage.registerFor,
	representationFrom: mockMessage.representationFrom,
	representationType: mockMessage.representationType,
	representativeFirstName: mockMessage.representative.firstName,
	representativeLastName: mockMessage.representative.lastName,
	representativeOrganisationName: mockMessage.representative.organisationName,
	representativeUnder18: mockMessage.representative.under18,
	representedFirstName: mockMessage.represented.firstName,
	representedLastName: mockMessage.represented.lastName,
	representedUnder18: mockMessage.represented.under18,
	hasAttachments: mockMessage.attachments.length > 0,
	modifiedAt: mockCurrentTime
};

const assertRepresentationUpsert = () => {
	expect(mockRepresentationUpsert).toHaveBeenCalledWith({
		where: {
			representationId: mockMessage.representationId
		},
		update: mockRepresentation,
		create: mockRepresentation
	});
	expect(mockContext.log).toHaveBeenCalledWith(
		`upserted representation with representationId: ${mockMessage.representationId}`
	);
};
describe('nsip-representation', () => {
	beforeEach(() => {
		mockRepresentationFindUnique.mockReset();
		mockRepresentationUpsert.mockReset();
		mockDocumentUpsert.mockReset();
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
			assertRepresentationUpsert();
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
				expect(mockDocumentUpsert).not.toHaveBeenCalled();
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
			describe('and the message has attachments', () => {
				it('upserts documents', async () => {
					mockRepresentationFindUnique.mockResolvedValue(mockRepresentation);
					await sendMessage(mockContextWithNewerTime, mockMessage);
					mockMessage.attachments.forEach((attachment) => {
						expect(mockDocumentUpsert).toHaveBeenCalledWith({
							where: {
								documentId: attachment.documentId
							},
							update: {
								documentId: attachment.documentId,
								representationId: mockMessage.representationId
							},
							create: {
								documentId: attachment.documentId,
								representationId: mockMessage.representationId
							}
						});
					});
				});
			});
			describe('and the message has no attachments', () => {
				it('does not upsert documents', async () => {
					const mockMessageWithNoAttachments = {
						...mockMessage,
						attachments: []
					};
					mockRepresentationFindUnique.mockResolvedValue(mockRepresentation);
					await sendMessage(mockContextWithNewerTime, mockMessageWithNoAttachments);
					expect(mockDocumentUpsert).not.toHaveBeenCalled();
				});
			});
			it('updates representation', async () => {
				mockRepresentationFindUnique.mockResolvedValue(mockRepresentation);
				await sendMessage(mockContextWithNewerTime, mockMessage);
				assertRepresentationUpsert();
			});
		});
	});
});
