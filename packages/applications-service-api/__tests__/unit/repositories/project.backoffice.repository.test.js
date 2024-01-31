const {
	getByCaseReference,
	getAllApplications
} = require('../../../src/repositories/project.backoffice.repository');

const mockFindUnique = jest.fn();
const mockFindMany = jest.fn();
jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query),
			findMany: (query) => mockFindMany(query)
		}
	}
}));

describe('project repository', () => {
	describe('getByCaseReference', () => {
		const caseReference = 'EN010009';

		it('calls findUnique with caseReference', async () => {
			await getByCaseReference(caseReference);

			expect(mockFindUnique).toBeCalledWith({
				where: { caseReference: caseReference },
				include: { applicant: true }
			});
		});
	});
	describe('getAllApplications', () => {
		it('calls findMany', async () => {
			await getAllApplications();

			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true }
			});
		});
		it('returns all applications', async () => {
			mockFindMany.mockResolvedValueOnce([]);
			const applications = await getAllApplications();
			expect(applications).toEqual([]);
		});
	});
});
