const {
	getByCaseReference,
	getAllApplications
} = require('../../../src/repositories/project.backoffice.repository');
const config = require('../../../src/lib/config');
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
				where: {
					caseReference: caseReference,
					publishStatus: 'published'
				},
				include: { applicant: true }
			});
		});
	});
	describe('getAllApplications', () => {
		beforeEach(() => {
			config.featureFlag.allowWelshCases = true;
		});

		it('calls findMany with no options', async () => {
			await getAllApplications();

			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: { publishStatus: 'published' }
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
					publishStatus: 'published',
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
				where: { publishStatus: 'published' },
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
					publishStatus: 'published',
					AND: [
						{
							OR: [
								{ caseReference: { contains: searchTerm } },
								{
									AND: [
										{ projectName: { contains: searchTerm.split(' ')[0] } },
										{ projectName: { contains: searchTerm.split(' ')[1] } }
									]
								},
								{
									AND: [
										{ projectNameWelsh: { contains: searchTerm.split(' ')[0] } },
										{ projectNameWelsh: { contains: searchTerm.split(' ')[1] } }
									]
								},
								{
									AND: [
										{ applicant: { organisationName: { contains: searchTerm.split(' ')[0] } } },
										{ applicant: { organisationName: { contains: searchTerm.split(' ')[1] } } }
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
					publishStatus: 'published',
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

		it('excludes welsh cases (FEATURE_ALLOW_WELSH_CASES=false)', async () => {
			config.featureFlag.allowWelshCases = false;
			await getAllApplications({});
			expect(mockFindMany).toBeCalledWith({
				include: { applicant: true },
				where: {
					publishStatus: 'published',
					AND: [
						{
							regions: {
								not: {
									contains: 'wales'
								}
							}
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
					publishStatus: 'published',
					AND: [
						{
							OR: [
								{ caseReference: { contains: searchTerm } },
								{
									AND: [{ projectName: { contains: searchTerm } }]
								},
								{
									AND: [{ projectNameWelsh: { contains: searchTerm } }]
								},
								{
									AND: [{ applicant: { organisationName: { contains: searchTerm } } }]
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
				where: { publishStatus: 'published' }
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
