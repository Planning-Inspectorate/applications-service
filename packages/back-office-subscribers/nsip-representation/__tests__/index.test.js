const subject = require('../index');

describe('nsip-representation', () => {
	const message = {
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

	const representation = {
		representationId: 6409,
		caseId: 151,
		caseReference: 'BC0110001',
		referenceId: 'BC0110001-55',
		status: 'VALID',
		dateReceived: '2023-08-11T10:52:56.516Z',
		originalRepresentation: 'some rep text secret stuff',
		redacted: true,
		redactedBy: 'Bloggs, Joe',
		redactedNotes: 'some notes here',
		redactedRepresentation: 'some rep text',
		registerFor: 'ORGANISATION',
		representationFrom: 'AGENT',
		representationType: null,
		representativeFirstName: 'joe',
		representativeLastName: 'bloggs',
		representativeOrganisationName: 'agent company',
		representativeUnder18: false,
		representedFirstName: 'jane',
		representedLastName: 'bloggs',
		representedUnder18: false,
		hasAttachments: true
	};

	beforeAll(() => jest.useFakeTimers());
	afterAll(() => jest.useRealTimers());

	describe('index', () => {
		it('assigns representation data to binding in correct format', async () => {
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
					representation: jest.fn(),
					document: jest.fn()
				}
			};

			await subject(mockContext, message);

			const expectedRepresentation = {
				...representation,
				modifiedAt: dateNow
			};

			const expectedDocuments = [
				{
					documentId: '8e706443-3404-4b89-9fda-280ab7fd6b68',
					representationId: 6409
				}
			];

			expect(mockContext.log).toBeCalledWith(
				`invoking nsip-representation function with message: ${JSON.stringify(message)}`
			);
			expect(mockContext.bindings.representation).toEqual(expectedRepresentation);
			expect(mockContext.bindings.document).toEqual(expectedDocuments);
		});
	});
});
