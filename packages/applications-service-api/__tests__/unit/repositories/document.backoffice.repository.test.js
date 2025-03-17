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

		it('calls findMany and count with searchTerm if provided', async () => {
			await getDocuments({
				caseReference: caseReference,
				searchTerm: 'someterm'
			});

			expect(mockFindMany.mock.calls[0][0].where.AND[2].OR[0].description.contains).toEqual(
				'someterm'
			);
			expect(mockCount.mock.calls[0][0].where.AND[2].OR[0].description.contains).toEqual(
				'someterm'
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
