const {
	getDocuments,
	getFilters,
	getDocumentsByType
} = require('../../../src/repositories/document.backoffice.repository');

const mockFindMany = jest.fn();
const mockCount = jest.fn();
const mockQueryRaw = jest.fn();
const mockFindFirst = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		document: {
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query),
			findFirst: (query) => mockFindFirst(query)
		},
		$queryRaw: (sql) => mockQueryRaw(sql)
	}
}));

describe('document repository', () => {
	beforeEach(() => {
		mockFindMany.mockReset();
		mockCount.mockReset();
		mockQueryRaw.mockReset();
		mockFindFirst.mockReset();
	});

	const caseReference = 'EN010009';

	describe('getDocuments', () => {
		it('calls findMany and count with caseReference', async () => {
			await getDocuments({ caseReference });

			expect(mockFindMany.mock.calls[0][0].where.AND[0]).toEqual({ caseRef: caseReference });
			expect(mockCount.mock.calls[0][0].where.AND[0]).toEqual({ caseRef: caseReference });
		});

		it('calls findMany and count with split and filtered searchTerm if provided', async () => {
			await getDocuments({
				caseReference: caseReference,
				searchTerm: 'a search term'
			});

			expect(mockFindMany.mock.calls[0][0].where.AND[2].OR[0].AND[0].description.contains).toEqual(
				'search'
			);
			expect(mockCount.mock.calls[0][0].where.AND[2].OR[0].AND[0].description.contains).toEqual(
				'search'
			);
		});

		it('calls findMany and count with filters if provided', async () => {
			await getDocuments({
				caseReference: caseReference,
				filters: [{ name: 'stage', value: 'examination' }]
			});

			expect(mockFindMany.mock.calls[0][0].where.AND[2].OR[0].AND[0].stage).toEqual('examination');
			expect(mockCount.mock.calls[0][0].where.AND[2].OR[0].AND[0].stage).toEqual('examination');
		});

		it('calls findMany and count with filters including type if provided', async () => {
			await getDocuments({
				caseReference: caseReference,
				filters: [
					{ name: 'stage', value: 'examination', type: [{ value: 'Additional Submissions' }] }
				]
			});

			expect(mockFindMany.mock.calls[0][0].where.AND[2].OR[0].AND[1].filter1['in'][0]).toEqual(
				'Additional Submissions'
			);
			expect(mockCount.mock.calls[0][0].where.AND[2].OR[0].AND[1].filter1['in'][0]).toEqual(
				'Additional Submissions'
			);
		});

		it('calls findMany and count with datePublished contains for single day (migrated case)', async () => {
			await getDocuments({
				caseReference,
				datePublishedFrom: '2025-06-15',
				datePublishedTo: '2025-06-15'
			});
			const where = mockFindMany.mock.calls[0][0].where;
			expect(
				where.AND.some((cond) => cond.datePublished && cond.datePublished.contains === '2025-06-15')
			).toBe(true);
			const whereCount = mockCount.mock.calls[0][0].where;
			expect(
				whereCount.AND.some(
					(cond) => cond.datePublished && cond.datePublished.contains === '2025-06-15'
				)
			).toBe(true);
		});

		it('calls findMany and count with datePublished gte for datePublishedFrom only', async () => {
			await getDocuments({
				caseReference,
				datePublishedFrom: '2025-06-15'
			});
			const where = mockFindMany.mock.calls[0][0].where;
			expect(
				where.AND.some((cond) => cond.datePublished && cond.datePublished.gte === '2025-06-15')
			).toBe(true);
			const whereCount = mockCount.mock.calls[0][0].where;
			expect(
				whereCount.AND.some((cond) => cond.datePublished && cond.datePublished.gte === '2025-06-15')
			).toBe(true);
		});

		it('calls findMany and count with datePublished lte for datePublishedTo only', async () => {
			await getDocuments({
				caseReference,
				datePublishedTo: '2025-06-15'
			});
			const where = mockFindMany.mock.calls[0][0].where;
			expect(
				where.AND.some((cond) => cond.datePublished && cond.datePublished.lte === '2025-06-15')
			).toBe(true);
			const whereCount = mockCount.mock.calls[0][0].where;
			expect(
				whereCount.AND.some((cond) => cond.datePublished && cond.datePublished.lte === '2025-06-15')
			).toBe(true);
		});

		it('calls findMany and count with datePublished gte/lte for date range', async () => {
			await getDocuments({
				caseReference,
				datePublishedFrom: '2025-06-15',
				datePublishedTo: '2025-06-16'
			});
			const where = mockFindMany.mock.calls[0][0].where;
			expect(
				where.AND.some(
					(cond) =>
						cond.datePublished &&
						cond.datePublished.gte === '2025-06-15' &&
						cond.datePublished.lte === '2025-06-16'
				)
			).toBe(true);
			const whereCount = mockCount.mock.calls[0][0].where;
			expect(
				whereCount.AND.some(
					(cond) =>
						cond.datePublished &&
						cond.datePublished.gte === '2025-06-15' &&
						cond.datePublished.lte === '2025-06-16'
				)
			).toBe(true);
		});
	});

	describe('getFilters', () => {
		it('calls queryRaw with correct caseReference', () => {
			getFilters(caseReference);

			expect(mockQueryRaw.mock.calls[0][0].values[0]).toEqual(caseReference);
		});
	});

	describe('getDocumentsByType', () => {
		it('calls find first with the case ref and type', async () => {
			mockFindFirst.mockReturnValue({ data: 'mock data' });
			const response = await getDocumentsByType({
				caseReference: 'mock case ref',
				type: 'mock type'
			});

			expect(mockFindFirst).toHaveBeenCalledWith({
				orderBy: [{ datePublished: 'desc' }, { representative: 'asc' }],
				take: 1,
				where: { caseRef: 'mock case ref', documentType: 'mock type' }
			});
			expect(response).toEqual({ data: 'mock data' });
		});
	});
});
