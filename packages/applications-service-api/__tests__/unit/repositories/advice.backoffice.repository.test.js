const {
	getAllAdviceByCaseReference,
	getAdviceById
} = require('../../../src/repositories/advice.backoffice.repository');
const { ADVICE_BACKOFFICE_DATA } = require('../../__data__/advice');

const mockFindMany = jest.fn();
const mockCount = jest.fn();
const mockFindUnique = jest.fn();
jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		advice: {
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query),
			findUnique: (query) => mockFindUnique(query)
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
			await getAllAdviceByCaseReference('backoffice', 0, 100, 'search Term');
			expect(mockFindMany).toHaveBeenCalledWith({
				where: {
					AND: [
						{ caseReference: 'backoffice' },
						{
							OR: [
								{ AND: [{ from: { contains: 'search' } }, { from: { contains: 'Term' } }] },
								{ AND: [{ agent: { contains: 'search' } }, { agent: { contains: 'Term' } }] },
								{
									AND: [
										{ enquiryDetails: { contains: 'search' } },
										{ enquiryDetails: { contains: 'Term' } }
									]
								},
								{
									AND: [
										{ enquiryDetailsWelsh: { contains: 'search' } },
										{ enquiryDetailsWelsh: { contains: 'Term' } }
									]
								},
								{
									AND: [
										{ adviceDetails: { contains: 'search' } },
										{ adviceDetails: { contains: 'Term' } }
									]
								},
								{
									AND: [
										{ adviceDetailsWelsh: { contains: 'search' } },
										{ adviceDetailsWelsh: { contains: 'Term' } }
									]
								}
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
	describe('getAdviceById', () => {
		beforeAll(() => {
			mockFindUnique.mockResolvedValue(ADVICE_BACKOFFICE_DATA[0]);
		});
		it('should call the database with the correct parameters', async () => {
			await getAdviceById(1);
			expect(mockFindUnique).toHaveBeenCalledWith({
				where: {
					adviceId: 1
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getAdviceById(1);
			expect(result).toEqual(ADVICE_BACKOFFICE_DATA[0]);
		});
	});
});
