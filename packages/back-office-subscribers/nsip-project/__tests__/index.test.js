const sendMessage = require('../index');
const { prismaClient } = require('../../lib/prisma');

const mockFindUnique = jest.fn();
const mockUpsert = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn().mockImplementation((callback) =>
			callback({
				project: {
					findUnique: mockFindUnique,
					upsert: mockUpsert
				}
			})
		)
	}
}));

const mockContext = {
	log: jest.fn(),
	bindingData: {
		enqueuedTimeUtc: new Date('2023-01-01T00:00:00.000Z').toUTCString(),
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
	applicantIds: ['1'],
	nsipOfficerIds: [],
	nsipAdministrationOfficerIds: [],
	inspectorIds: [],
	interestedPartyIds: [],
	regions: ['a', 'b']
};

const mockProject = {
	caseId: 1,
	caseReference: 'ABC',
	projectDescription: 'some desc',
	projectName: 'some case',
	publishStatus: 'published',
	regions: '["a","b"]',
	sourceSystem: 'ODT',
	modifiedAt: new Date('2023-01-01T00:00:00.000Z')
};

const assertUpsert = (mockUpsert, mockProject) => {
	expect(mockUpsert).toHaveBeenCalledWith({
		where: {
			caseReference: mockMessage.caseReference
		},
		create: mockProject,
		update: mockProject
	});
	expect(mockContext.log).toHaveBeenCalledWith(
		`upserted project with caseReference: ${mockMessage.caseReference}`
	);
};

describe('nsip-project', () => {
	beforeEach(() => {
		mockFindUnique.mockReset();
		mockUpsert.mockReset();
	});
	beforeAll(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date('2023-01-01T00:00:00.000Z'));
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
		expect(mockContext.log).toHaveBeenCalledWith(
			'skipping update of events as caseReference is missing'
		);
		expect(mockFindUnique).not.toHaveBeenCalled();
	});
	it('start transaction', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(prismaClient.$transaction).toHaveBeenCalled();
	});
	it('finds existing project to determine if it should update', async () => {
		await sendMessage(mockContext, mockMessage);
		expect(mockFindUnique).toHaveBeenCalledWith({
			where: {
				caseReference: mockMessage.caseReference
			}
		});
	});
	describe('when no project exists in database', () => {
		it('creates new project for caseReference', async () => {
			mockFindUnique.mockResolvedValue(null);
			await sendMessage(mockContext, mockMessage);
			assertUpsert(mockUpsert, mockProject);
		});
	});
	describe('when project exists in database', () => {
		describe('and the message is older than existing project', () => {
			it('skips update', async () => {
				mockFindUnique.mockResolvedValue(mockProject);
				const mockContextWithOlderTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: new Date('2022-01-01T00:00:00.000Z').toUTCString()
					}
				};
				await sendMessage(mockContextWithOlderTime, mockMessage);
				expect(mockUpsert).not.toHaveBeenCalled();
				expect(mockContext.log).toHaveBeenCalledWith(
					`skipping update of project with caseReference: ${mockMessage.caseReference}`
				);
			});
		});
		describe('and the message is newer than existing project', () => {
			it('updates project', async () => {
				mockFindUnique.mockResolvedValue(mockProject);
				const mockContextWithNewerTime = {
					...mockContext,
					bindingData: {
						...mockContext.bindingData,
						enqueuedTimeUtc: new Date('2024-01-01T00:00:00.000Z').toUTCString()
					}
				};
				await sendMessage(mockContextWithNewerTime, mockMessage);
				assertUpsert(mockUpsert, mockProject);
			});
		});
	});
});
