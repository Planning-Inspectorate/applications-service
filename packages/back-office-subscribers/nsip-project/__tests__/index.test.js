const sendMessage = require('../index');
const { serviceUserQuery } = require('../../lib/queries');
const buildMergeQuery = require('../../lib/build-merge-query');

const mockExecuteRawUnsafe = jest.fn();
jest.mock('../../lib/build-merge-query', () =>
	jest.fn().mockImplementation(jest.requireActual('../../lib/build-merge-query'))
);
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
	caseId: 1,
	caseReference: 'ABC',
	projectName: 'some case',
	projectDescription: 'some desc',
	publishStatus: 'published',
	sourceSystem: 'ODT',
	applicantId: 'mock-applicant-id',
	nsipOfficerIds: [],
	nsipAdministrationOfficerIds: [],
	inspectorIds: [],
	interestedPartyIds: [],
	regions: ['a', 'b', 'c'],
	dateOfReOpenRelevantRepresentationStart: '2024-01-01T09:00:00.000Z',
	dateOfReOpenRelevantRepresentationClose: '2024-02-01T09:00:00.000Z',
	isMaterialChange: true
};

const mockProject = {
	caseId: 1,
	caseReference: mockMessage.caseReference,
	projectName: mockMessage.projectName,
	projectDescription: mockMessage.projectDescription,
	publishStatus: mockMessage.publishStatus,
	sourceSystem: mockMessage.sourceSystem,
	regions: 'a,b,c',
	applicantId: mockMessage.applicantId,
	dateOfReOpenRelevantRepresentationStart: mockMessage.dateOfReOpenRelevantRepresentationStart,
	dateOfReOpenRelevantRepresentationClose: mockMessage.dateOfReOpenRelevantRepresentationClose,
	modifiedAt: new Date(),
	isMaterialChange: true
};

describe('nsip-project', () => {
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
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-project function');
	});
	it('throws error if caseReference is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'caseReference is required'
		);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('throws error if applicantId is missing', async () => {
		await expect(
			async () => await sendMessage(mockContext, { caseReference: 'ABC' })
		).rejects.toThrow('applicantId is required');
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('creates applicant', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(serviceUserQuery, mockMessage.applicantId);
		expect(mockContext.log).toHaveBeenCalledWith(
			`created applicant with serviceUserId ${mockMessage.applicantId}`
		);
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
	it('calls buildMergeQuery with correct parameters for welsh project', async () => {
		const mockWelshMessage = {
			...mockMessage,
			projectNameWelsh: 'some welsh case',
			projectDescriptionWelsh: 'some welsh desc',
			projectLocationWelsh: 'some welsh location'
		};

		const mockWelshProject = {
			...mockProject,
			projectLocationWelsh: 'some welsh location',
			projectNameWelsh: 'some welsh case',
			projectDescriptionWelsh: 'some welsh desc'
		};
		await sendMessage(mockContext, mockWelshMessage);
		expect(buildMergeQuery).toHaveBeenCalledWith(
			'project',
			'caseReference',
			mockWelshProject,
			mockEnqueueDateTime
		);
	});

	it('upserts project', async () => {
		await sendMessage(mockContext, mockMessage);
		const expectedParameters = Object.values(mockProject);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[1];
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [project] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12) AS Source ([caseId], [caseReference], [projectName], [projectDescription], [publishStatus], [sourceSystem], [regions], [dateOfReOpenRelevantRepresentationStart], [dateOfReOpenRelevantRepresentationClose], [isMaterialChange], [applicantId], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[caseReference] = Source.[caseReference]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[caseId] = Source.[caseId], Target.[projectName] = Source.[projectName], Target.[projectDescription] = Source.[projectDescription], Target.[publishStatus] = Source.[publishStatus], Target.[sourceSystem] = Source.[sourceSystem], Target.[regions] = Source.[regions], Target.[dateOfReOpenRelevantRepresentationStart] = Source.[dateOfReOpenRelevantRepresentationStart], Target.[dateOfReOpenRelevantRepresentationClose] = Source.[dateOfReOpenRelevantRepresentationClose], Target.[isMaterialChange] = Source.[isMaterialChange], Target.[applicantId] = Source.[applicantId], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([caseId], [caseReference], [projectName], [projectDescription], [publishStatus], [sourceSystem], [regions], [dateOfReOpenRelevantRepresentationStart], [dateOfReOpenRelevantRepresentationClose], [isMaterialChange], [applicantId], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12);'
		);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted project with caseReference ${mockMessage.caseReference}`
		);
	});
});
