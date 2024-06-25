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
	adviceId: 1,
	adviceReference: 'TR0200007-0005',
	caseReference: 'BC0110001',
	caseId: 130,
	title: 'Advice title',
	titleWelsh: 'Advice title in Welsh',
	from: 'Advice from',
	agent: 'Advice agent',
	method: 'Advice method',
	enquiryDate: new Date('2021-06-01'),
	enquiryDetails: 'Advice enquiry details',
	enquiryDetailsWelsh: 'Advice enquiry details in Welsh',
	adviceGivenBy: 'Advice given by',
	adviceDate: new Date('2021-08-01'),
	adviceDetails: 'Advice details',
	adviceDetailsWelsh: 'Advice details in Welsh',
	status: 'published',
	redactionStatus: 'unredacted',
	attachmentIds: ['1', '2', '3']
};

const mockAdvice = {
	...mockMessage,
	attachmentIds: mockMessage.attachmentIds.join(','),
	modifiedAt: new Date()
};

describe('nsip-advice', () => {
	beforeEach(() => {
		mockExecuteRawUnsafe.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(mockAdvice.modifiedAt));
	});
	afterAll(() => {
		jest.useRealTimers();
	});

	it('logs message', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockContext.log).toHaveBeenCalledWith('invoking nsip-advice function');
	});

	it('throws error if adviceId is missing', async () => {
		await expect(async () => await sendMessage(mockContext, {})).rejects.toThrow(
			'adviceId is required'
		);
		expect(mockExecuteRawUnsafe).not.toHaveBeenCalled();
	});

	it('calls buildMergeQuery with correct parameters', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(buildMergeQuery).toHaveBeenCalledWith(
			'advice',
			'adviceId',
			mockAdvice,
			mockEnqueueDateTime
		);
	});

	it('runs query to upsert advice', async () => {
		await sendMessage(mockContext, mockMessage);
		const [receivedStatement, ...receivedParameters] = mockExecuteRawUnsafe.mock.calls[0];
		const statements = receivedStatement.split('\n');
		expect(statements[0].trim()).toBe('MERGE INTO [advice] AS Target');
		expect(statements[1].trim()).toBe(
			'USING (SELECT @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18, @P19, @P20) AS Source ([adviceId], [adviceReference], [caseReference], [caseId], [title], [titleWelsh], [from], [agent], [method], [enquiryDate], [enquiryDetails], [enquiryDetailsWelsh], [adviceGivenBy], [adviceDate], [adviceDetails], [adviceDetailsWelsh], [status], [redactionStatus], [attachmentIds], [modifiedAt])'
		);
		expect(statements[2].trim()).toBe('ON Target.[adviceId] = Source.[adviceId]');
		expect(statements[3].trim()).toBe('WHEN MATCHED');
		expect(statements[4].trim()).toBe(
			`AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, Target.[modifiedAt])`
		);
		expect(statements[5].trim()).toBe(
			'THEN UPDATE SET Target.[adviceReference] = Source.[adviceReference], Target.[caseReference] = Source.[caseReference], Target.[caseId] = Source.[caseId], Target.[title] = Source.[title], Target.[titleWelsh] = Source.[titleWelsh], Target.[from] = Source.[from], Target.[agent] = Source.[agent], Target.[method] = Source.[method], Target.[enquiryDate] = Source.[enquiryDate], Target.[enquiryDetails] = Source.[enquiryDetails], Target.[enquiryDetailsWelsh] = Source.[enquiryDetailsWelsh], Target.[adviceGivenBy] = Source.[adviceGivenBy], Target.[adviceDate] = Source.[adviceDate], Target.[adviceDetails] = Source.[adviceDetails], Target.[adviceDetailsWelsh] = Source.[adviceDetailsWelsh], Target.[status] = Source.[status], Target.[redactionStatus] = Source.[redactionStatus], Target.[attachmentIds] = Source.[attachmentIds], Target.[modifiedAt] = Source.[modifiedAt]'
		);
		expect(statements[6].trim()).toBe(
			'WHEN NOT MATCHED THEN INSERT ([adviceId], [adviceReference], [caseReference], [caseId], [title], [titleWelsh], [from], [agent], [method], [enquiryDate], [enquiryDetails], [enquiryDetailsWelsh], [adviceGivenBy], [adviceDate], [adviceDetails], [adviceDetailsWelsh], [status], [redactionStatus], [attachmentIds], [modifiedAt]) VALUES (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10, @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18, @P19, @P20);'
		);
		const expectedParameters = Object.values(mockAdvice);
		expect(receivedParameters.length).toBe(expectedParameters.length);
		expect(receivedParameters).toEqual(expect.arrayContaining(expectedParameters));
		expect(mockContext.log).toHaveBeenCalledWith(
			`upserted advice with adviceId ${mockMessage.adviceId}`
		);
	});
});
