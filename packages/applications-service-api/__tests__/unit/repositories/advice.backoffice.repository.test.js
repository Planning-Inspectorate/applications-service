const {
	getAllAdviceByCaseReference
} = require('../../../src/repositories/advice.backoffice.repository');
const { ADVICE_BACKOFFICE_DATA } = require('../../__data__/advice');

const mockFindMany = jest.fn();
const mockCount = jest.fn();
jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		advice: {
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query)
		}
	}
}));

describe('advice.backoffice.repository', () => {
	describe('getAllAdviceByCaseReference', () => {
		beforeAll(() => {
			mockFindMany.mockResolvedValue(ADVICE_BACKOFFICE_DATA);
			mockCount.mockResolvedValue(1);
		});
		it('should call the database with the correct parameters', async () => {
			await getAllAdviceByCaseReference('backoffice', 0, 100, 'searchTerm');
			expect(mockFindMany).toHaveBeenCalledWith({
				where: {
					AND: [
						{ caseReference: 'backoffice' },
						{
							OR: [
								{ from: { contains: 'searchTerm' } },
								{ agent: { contains: 'searchTerm' } },
								{ enquiryDetails: { contains: 'searchTerm' } },
								{ adviceDetails: { contains: 'searchTerm' } }
							]
						}
					]
				},
				orderBy: [
					{
						adviceDate: 'desc'
					},
					{
						adviceId: 'asc'
					}
				],
				skip: 0,
				take: 100
			});
		});
		it('should return the correct data', async () => {
			const result = await getAllAdviceByCaseReference('backoffice');
			expect(result).toEqual({
				count: 1,
				advice: ADVICE_BACKOFFICE_DATA
			});
		});
	});
});
