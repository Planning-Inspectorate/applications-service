const { getProjectUpdates } = require('../../../src/repositories/projectUpdate.repository');

const mockFindMany = jest.fn();
jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		projectUpdate: {
			findMany: (query) => mockFindMany(query)
		}
	}
}));

describe('project update repository', () => {
	describe('getProjectUpdates', () => {
		const caseReference = 'EN010009';

		it('calls findMany with where caseReference and orderBy updateDate', async () => {
			await getProjectUpdates(caseReference);

			expect(mockFindMany).toBeCalledWith({
				where: { caseReference: caseReference },
				orderBy: {
					updateDate: 'desc'
				}
			});
		});
	});
});
