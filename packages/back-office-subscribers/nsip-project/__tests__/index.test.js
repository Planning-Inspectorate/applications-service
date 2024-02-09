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
	regions: ['a', 'b', 'c']
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
	modifiedAt: new Date()
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
	it('skips update if caseReference is missing', async () => {
		await sendMessage(mockContext, {});
		expect(mockContext.log).toHaveBeenCalledWith('skipping update as caseReference is missing');
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	describe('when applicantId is missing', () => {
		it('skips update', async () => {
			await sendMessage(mockContext, { caseReference: 'ABC' });
			expect(mockContext.log).toHaveBeenCalledWith('skipping update as applicantId is missing');
			expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
		});
	});
	describe('when applicantId is present', () => {
		it('creates applicant', async () => {
			await sendMessage(mockContext, mockMessage);
			expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(
				`
		MERGE INTO [dbo].[serviceUser] AS Target 
		USING (SELECT @P1 AS serviceUserId) AS Source
		ON Target.[serviceUserId] = Source.[serviceUserId]
		WHEN MATCHED THEN UPDATE SET Target.[serviceUserId] = Source.[serviceUserId]
		WHEN NOT MATCHED THEN INSERT ([serviceUserId]) VALUES (@P1);`,
				mockMessage.applicantId
			);
			expect(mockContext.log).toHaveBeenCalledWith(
				`created applicant with serviceUserId ${mockMessage.applicantId}`
			);
		});
	});
	it('upserts project', async () => {
		await sendMessage(mockContext, mockMessage);
		const expectedStatement = `MERGE INTO [project] AS Target
			USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9) AS Source ([caseId], [caseReference], [projectName], [projectDescription], [publishStatus], [sourceSystem], [regions], [applicantId], [modifiedAt])
			ON Target.[caseReference] = Source.[caseReference]
			WHEN MATCHED 
			AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])
			THEN UPDATE SET Target.[caseId] = Source.[caseId], Target.[projectName] = Source.[projectName], Target.[projectDescription] = Source.[projectDescription], Target.[publishStatus] = Source.[publishStatus], Target.[sourceSystem] = Source.[sourceSystem], Target.[regions] = Source.[regions], Target.[applicantId] = Source.[applicantId], Target.[modifiedAt] = Source.[modifiedAt]
			WHEN NOT MATCHED THEN INSERT ([caseId], [caseReference], [projectName], [projectDescription], [publishStatus], [sourceSystem], [regions], [applicantId], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9);`;
		const expectedParameters = Object.values(mockProject);
		const [first, ...rest] = mockExecuteRawUnsafe.mock.calls[1];
		expect(first).toEqual(expectedStatement);
		expect(rest).toEqual(expectedParameters);
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted project with caseReference ${mockMessage.caseReference}`
		);
	});
});
