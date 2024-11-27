const {
	getByCaseReference,
	getAllApplications
} = require('../../../src/repositories/project.backoffice.repository');
const { APPLICATION_DB } = require('../../__data__/application');
const mockFindUnique = jest.fn();
const mockFindMany = jest.fn();
const mockCount = jest.fn();

jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query),
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query)
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
		it('calls findMany with no options', async () => {
			await getAllApplications();

			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {}
			});
		});
		it('calls findMany with the excludeNullDateOfSubmission option', async () => {
			const options = {
				excludeNullDateOfSubmission: true
			};

			await getAllApplications(options);

			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {
					AND: [{ OR: [{ dateOfDCOSubmission: { not: null } }] }]
				}
			});
		});
		it('calls findMany with given pagination options', async () => {
			const options = {
				orderBy: { projectName: 'asc' },
				offset: 0,
				size: 10
			};
			await getAllApplications(options);

			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {},
				orderBy: { projectName: 'asc' },
				skip: 0,
				take: 10
			});
		});
		it('calls findMany with search term', async () => {
			const searchTerm = 'test search';
			await getAllApplications({ searchTerm });
			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {
					AND: [
						{
							OR: [
								{ projectName: { contains: searchTerm } },
								{ caseReference: { contains: searchTerm } },
								{ projectNameWelsh: { contains: searchTerm } },
								{
									OR: [
										{ applicant: { organisationName: { contains: 'test' } } },
										{ applicant: { firstName: { contains: 'test' } } },
										{ applicant: { lastName: { contains: 'test' } } }
									]
								},
								{
									OR: [
										{ applicant: { organisationName: { contains: 'search' } } },
										{ applicant: { firstName: { contains: 'search' } } },
										{ applicant: { lastName: { contains: 'search' } } }
									]
								}
							]
						}
					]
				}
			});
		});

		it('calls findMany with filters', async () => {
			const filters = {
				region: ['eastern', 'north_west'],
				stage: ['acceptance', 'recommendation'],
				sector: ['energy', 'transport']
			};
			await getAllApplications({ filters });
			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {
					AND: [
						{
							OR: [{ regions: { contains: 'eastern' } }, { regions: { contains: 'north_west' } }]
						},
						{
							OR: [{ stage: 'acceptance' }, { stage: 'recommendation' }]
						},
						{
							OR: [{ sector: { contains: 'energy' } }, { sector: { contains: 'transport' } }]
						}
					]
				}
			});
		});

		it('calls findMany with filters and search term', async () => {
			const searchTerm = 'test';
			const filters = {
				region: ['eastern', 'north_west'],
				stage: ['acceptance', 'recommendation'],
				sector: ['energy', 'transport']
			};
			await getAllApplications({ filters, searchTerm });
			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {
					AND: [
						{
							OR: [
								{ projectName: { contains: searchTerm } },
								{ caseReference: { contains: searchTerm } },
								{ projectNameWelsh: { contains: searchTerm } },
								{
									OR: [
										{ applicant: { organisationName: { contains: searchTerm } } },
										{ applicant: { firstName: { contains: searchTerm } } },
										{ applicant: { lastName: { contains: searchTerm } } }
									]
								}
							]
						},
						{
							OR: [{ regions: { contains: 'eastern' } }, { regions: { contains: 'north_west' } }]
						},
						{
							OR: [{ stage: 'acceptance' }, { stage: 'recommendation' }]
						},
						{
							OR: [{ sector: { contains: 'energy' } }, { sector: { contains: 'transport' } }]
						}
					]
				}
			});
		});

		it('calls count', async () => {
			await getAllApplications();
			expect(mockCount).toBeCalledWith({
				where: {}
			});
		});
		it('returns all applications', async () => {
			mockFindMany.mockResolvedValueOnce([APPLICATION_DB]);
			mockCount.mockResolvedValueOnce(1);
			const applications = await getAllApplications();
			expect(applications).toEqual({ applications: [APPLICATION_DB], count: 1 });
		});
	});
});
