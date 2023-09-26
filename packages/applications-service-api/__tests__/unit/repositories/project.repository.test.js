const { getByCaseReference } = require('../../../src/repositories/project.repository');

const mockFindUnique = jest.fn();
jest.mock('@pins/common/src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));

describe('project repository', () => {
	describe('getByCaseReference', () => {
		const caseReference = 'EN010009';

		it('calls findUnique with caseReference', async () => {
			await getByCaseReference(caseReference);

			expect(mockFindUnique).toBeCalledWith({ where: { caseReference: caseReference } });
		});
	});
});
