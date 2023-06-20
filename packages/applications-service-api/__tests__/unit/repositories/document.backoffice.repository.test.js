const {
	getDocuments,
	getFilters
} = require('../../../src/repositories/document.backoffice.repository');

const mockFindMany = jest.fn();
const mockCount = jest.fn();
const mockQueryRaw = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	createPrismaClient: () => ({
		document: {
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query)
		},
		$queryRaw: (sql) => mockQueryRaw(sql)
	})
}));

describe('document repository', () => {
	beforeEach(() => {
		mockFindMany.mockReset();
		mockCount.mockReset();
		mockQueryRaw.mockReset();
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
	});

	describe('getFilters', () => {
		it('calls queryRaw with correct caseReference', () => {
			getFilters(caseReference);

			expect(mockQueryRaw.mock.calls[0][0].values[0]).toEqual(caseReference);
		});
	});
});
