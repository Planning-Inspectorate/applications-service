const sendMessage = require('../index');
const {
	mockMessageWithInvalidServiceUserType,
	mockApplicantMessage,
	mockApplicantServiceUser,
	mockRepresentationContactMessage,
	mockRepresentationContactServiceUser
} = require('../../__data__/service-user');

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

describe('nsip-service-user', () => {
	beforeEach(() => {
		mockExecuteRawUnsafe.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockApplicantServiceUser.modifiedAt));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockApplicantMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-service-user function');
	});

	it('throws error if serviceUserId is missing', async () => {
		await expect(sendMessage(mockContext, {})).rejects.toThrow(`id is required`);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('throws error if serviceUserType is invalid', async () => {
		await expect(sendMessage(mockContext, mockMessageWithInvalidServiceUserType)).rejects.toThrow(
			`Invalid serviceUserType: ${mockMessageWithInvalidServiceUserType.serviceUserType}`
		);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	describe('when service user is valid', () => {
		it('runs query to match upsert RepresentationContact', async () => {
			await sendMessage(mockContext, mockRepresentationContactMessage);
			const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
			const statements = receivedStatement.split('\n');
			expect(statements[0].trim()).toBe('MERGE INTO [serviceUser] AS Target');
			expect(statements[1].trim()).toBe(
				'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7) AS Source ([serviceUserId], [firstName], [lastName], [organisationName], [caseReference], [serviceUserType], [modifiedAt])'
			);
			expect(statements[2].trim()).toBe('ON Target.[serviceUserId] = Source.[serviceUserId]');
			expect(statements[3].trim()).toBe('WHEN MATCHED');
			expect(statements[4].trim()).toBe(
				`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
			);
			expect(statements[5].trim()).toBe(
				'THEN UPDATE SET Target.[firstName] = Source.[firstName], Target.[lastName] = Source.[lastName], Target.[organisationName] = Source.[organisationName], Target.[caseReference] = Source.[caseReference], Target.[serviceUserType] = Source.[serviceUserType], Target.[modifiedAt] = Source.[modifiedAt]'
			);
			expect(statements[6].trim()).toBe(
				'WHEN NOT MATCHED THEN INSERT ([serviceUserId], [firstName], [lastName], [organisationName], [caseReference], [serviceUserType], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7);'
			);
			const expectedParameters = Object.values(mockRepresentationContactServiceUser);
			expect(receivedParameters.length).toBe(expectedParameters.length);
			expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
			expect(mockContext.log).toHaveBeenCalledWith(
				`updated serviceUser with serviceUserId ${mockRepresentationContactServiceUser.serviceUserId}`
			);
		});

		it('runs query to match upsert Applicant2', async () => {
			await sendMessage(mockContext, mockApplicantMessage);

			const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
			const statements = receivedStatement.split('\n');
			expect(statements[0].trim()).toBe('MERGE INTO [serviceUser] AS Target');
			expect(statements[1].trim()).toBe(
				'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10) AS Source ([serviceUserId], [firstName], [lastName], [organisationName], [caseReference], [serviceUserType], [email], [webAddress], [phoneNumber], [modifiedAt])'
			);
			expect(statements[2].trim()).toBe('ON Target.[serviceUserId] = Source.[serviceUserId]');
			expect(statements[3].trim()).toBe('WHEN MATCHED');
			expect(statements[4].trim()).toBe(
				`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
			);
			expect(statements[5].trim()).toBe(
				'THEN UPDATE SET Target.[firstName] = Source.[firstName], Target.[lastName] = Source.[lastName], Target.[organisationName] = Source.[organisationName], Target.[caseReference] = Source.[caseReference], Target.[serviceUserType] = Source.[serviceUserType], Target.[email] = Source.[email], Target.[webAddress] = Source.[webAddress], Target.[phoneNumber] = Source.[phoneNumber], Target.[modifiedAt] = Source.[modifiedAt]'
			);
			expect(statements[6].trim()).toBe(
				'WHEN NOT MATCHED THEN INSERT ([serviceUserId], [firstName], [lastName], [organisationName], [caseReference], [serviceUserType], [email], [webAddress], [phoneNumber], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10);'
			);
			const expectedParameters = Object.values(mockApplicantServiceUser);
			expect(receivedParameters.length).toBe(expectedParameters.length);
			expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
			expect(mockContext.log).toHaveBeenCalledWith(
				`updated serviceUser with serviceUserId ${mockApplicantServiceUser.serviceUserId}`
			);
		});
	});
});
