const buildPrismaUpdateQuery = require('../build-prisma-update-query');

describe('#buildPrismaUpdateQuery', () => {
	const mockUpdateMany = jest.fn().mockResolvedValue({ count: 1 });
	const mockRepository = { updateMany: mockUpdateMany };

	beforeEach(() => {
		mockUpdateMany.mockClear();
	});

	it('throws error if required parameters are missing', async () => {
		await expect(
			buildPrismaUpdateQuery(undefined, 'representationId', {}, '2023-01-01')
		).rejects.toThrow('repository, keyColumn, entity and dateToCompare are required');
		await expect(
			buildPrismaUpdateQuery(mockRepository, undefined, {}, '2023-01-01')
		).rejects.toThrow('repository, keyColumn, entity and dateToCompare are required');
		await expect(
			buildPrismaUpdateQuery(mockRepository, 'representationId', undefined, '2023-01-01')
		).rejects.toThrow('repository, keyColumn, entity and dateToCompare are required');
		await expect(
			buildPrismaUpdateQuery(mockRepository, 'representationId', {}, undefined)
		).rejects.toThrow('repository, keyColumn, entity and dateToCompare are required');
	});

	it('throws error if key column value is null', async () => {
		await expect(
			buildPrismaUpdateQuery(
				mockRepository,
				'representationId',
				{ representationId: null, status: 'awaiting_review' },
				'2023-01-01'
			)
		).rejects.toThrow('Key column value for representationId is required');
	});

	it('throws error if key column value is undefined (missing from entity)', async () => {
		await expect(
			buildPrismaUpdateQuery(
				mockRepository,
				'representationId',
				{ status: 'awaiting_review' },
				'2023-01-01'
			)
		).rejects.toThrow('Key column value for representationId is required');
	});

	it('calls updateMany with correct where and data arguments', async () => {
		const entity = {
			representationId: 123,
			status: 'awaiting_review',
			modifiedAt: new Date('2023-01-01T09:00:00.000Z')
		};

		await buildPrismaUpdateQuery(
			mockRepository,
			'representationId',
			entity,
			'2023-01-01T09:00:00.000Z'
		);

		expect(mockUpdateMany).toHaveBeenCalledWith({
			where: {
				representationId: 123,
				modifiedAt: {
					lte: new Date('2023-01-01T09:01:00.000Z')
				}
			},
			data: {
				status: 'awaiting_review',
				modifiedAt: new Date('2023-01-01T09:00:00.000Z')
			}
		});
	});

	it('converts null values and undefined to null in a payload', async () => {
		const entity = {
			representationId: 123,
			status: null,
			comment: 'some comment',
			redactedBy: undefined,
			modifiedAt: new Date('2023-01-01T09:00:00.000Z')
		};

		await buildPrismaUpdateQuery(
			mockRepository,
			'representationId',
			entity,
			'2023-01-01T09:00:00.000Z'
		);

		const callArgs = mockUpdateMany.mock.calls[0][0];
		expect(callArgs.data.status).toBeNull();
		expect(callArgs.data.comment).toBe('some comment');
		expect(callArgs.data.redactedBy).toBeNull();
	});

	it('computes the staleness threshold as dateToCompare + 1 minute', async () => {
		const entity = {
			representationId: 123,
			status: 'awaiting_review',
			modifiedAt: new Date()
		};

		await buildPrismaUpdateQuery(
			mockRepository,
			'representationId',
			entity,
			'Sun, 01 Jan 2023 09:00:00 GMT'
		);

		const callArgs = mockUpdateMany.mock.calls[0][0];
		const expectedThreshold = new Date(new Date('Sun, 01 Jan 2023 09:00:00 GMT').getTime() + 60000);
		expect(callArgs.where.modifiedAt.lte).toEqual(expectedThreshold);
	});

	it('returns the result from updateMany', async () => {
		mockUpdateMany.mockResolvedValue({ count: 0 });

		const entity = {
			representationId: 123,
			status: 'awaiting_review',
			modifiedAt: new Date()
		};

		const result = await buildPrismaUpdateQuery(
			mockRepository,
			'representationId',
			entity,
			'2023-01-01T09:00:00.000Z'
		);

		expect(result).toEqual({ count: 0 });
	});

	it('works with any repository for generic usage', async () => {
		const repository = { updateMany: jest.fn().mockResolvedValue({ count: 1 }) };

		const entity = {
			caseReference: 'EN010001',
			projectName: 'Test Project',
			modifiedAt: new Date('2023-06-01T10:00:00.000Z')
		};

		await buildPrismaUpdateQuery(repository, 'caseReference', entity, '2023-06-01T10:00:00.000Z');

		expect(repository.updateMany).toHaveBeenCalledWith({
			where: {
				caseReference: 'EN010001',
				modifiedAt: {
					lte: new Date('2023-06-01T10:01:00.000Z')
				}
			},
			data: {
				projectName: 'Test Project',
				modifiedAt: new Date('2023-06-01T10:00:00.000Z')
			}
		});
	});
});
