const {
	APPLICATION_DB,
	APPLICATIONS_FO_FILTERS,
	APPLICATION_API_V1,
	APPLICATIONS_BO_FILTER_COLUMNS
} = require('../__data__/application');
const { request } = require('../__data__/supertest');
const config = require('../../src/lib/config');

const mockFindUnique = jest.fn();
const mockCount = jest.fn();
const mockProjectFindMany = jest.fn();
jest.mock('../../src/lib/prisma', () => ({
	prismaClient: {
		project: {
			findUnique: (query) => mockFindUnique(query),
			findMany: (query) => mockProjectFindMany(query),
			count: (query) => mockCount(query)
		}
	}
}));

describe('/api/v1/applications', () => {
	describe('get single application', () => {
		afterEach(() => {
			mockFindUnique.mockClear();
		});
		it('given case with caseReference exists, returns 200', async () => {
			mockFindUnique.mockResolvedValueOnce(APPLICATION_DB);

			const response = await request.get('/api/v1/applications/EN010116');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				...APPLICATION_API_V1,
				sourceSystem: 'ODT',
				deadlineForAcceptanceDecision: '2023-01-30',
				deadlineForDecision: null,
				deadlineForSubmissionOfRecommendation: null,
				AnticipatedCloseOfExamination: null
			});
		});
		it('returns 400 if caseReference is in invalid format', async () => {
			const response = await request.get('/api/v1/applications/bad_format');

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				code: 400,
				errors: ['\'caseReference\' must match pattern "^[A-Za-z]{2}\\d{6,8}$"']
			});
		});
	});
	describe('get all applications', () => {
		describe('when getAllApplications is BO', () => {
			beforeEach(() => {
				config.featureFlag.allowWelshCases = true;
				mockProjectFindMany
					// applications
					.mockResolvedValueOnce([APPLICATION_DB])
					// filters
					.mockResolvedValueOnce(APPLICATIONS_BO_FILTER_COLUMNS)
					.mockClear();
				mockCount.mockResolvedValue(1);
			});
			it('happy path', async () => {
				const response = await request.get('/api/v1/applications');

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					applications: [
						{
							...APPLICATION_API_V1,
							sourceSystem: 'ODT',
							deadlineForAcceptanceDecision: '2023-01-30',
							deadlineForDecision: null,
							deadlineForSubmissionOfRecommendation: null,
							AnticipatedCloseOfExamination: null
						}
					],
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 1,
					totalPages: 1,
					totalItemsWithoutFilters: 1,
					filters: APPLICATIONS_FO_FILTERS
				});
			});
			it('with filters applied', async () => {
				const queryString = [
					'stage=acceptance',
					'stage=recommendation',
					'region=eastern',
					'region=north_west',
					'sector=energy',
					'sector=transport'
				].join('&');

				const response = await request.get(`/api/v1/applications?${queryString}`);

				expect(mockProjectFindMany).toHaveBeenNthCalledWith(1, {
					include: { applicant: true },
					orderBy: { projectName: 'asc' },
					skip: 0,
					take: 25,
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
				expect(response.status).toEqual(200);
			});

			it('with search term applied', async () => {
				const response = await request.get('/api/v1/applications?searchTerm=London%20Resort');

				expect(mockProjectFindMany).toBeCalledWith({
					include: { applicant: true },
					orderBy: { projectName: 'asc' },
					skip: 0,
					take: 25,
					where: {
						publishStatus: 'published',
						AND: [
							{
								OR: [
									{ caseReference: { contains: 'London Resort' } },
									{
										AND: [
											{ projectName: { contains: 'London' } },
											{ projectName: { contains: 'Resort' } }
										]
									},
									{
										AND: [
											{ projectNameWelsh: { contains: 'London' } },
											{ projectNameWelsh: { contains: 'Resort' } }
										]
									},
									{
										AND: [
											{ applicant: { organisationName: { contains: 'London' } } },
											{ applicant: { organisationName: { contains: 'Resort' } } }
										]
									}
								]
							}
						]
					}
				});

				expect(response.status).toEqual(200);
			});

			it('with search term and filters applied', async () => {
				const queryString = [
					'stage=acceptance',
					'stage=recommendation',
					'region=eastern',
					'region=north_west',
					'sector=energy',
					'sector=transport',
					'searchTerm=Nuclear'
				].join('&');

				const response = await request.get(`/api/v1/applications?${queryString}`);

				expect(mockProjectFindMany).toBeCalledWith({
					include: { applicant: true },
					orderBy: { projectName: 'asc' },
					skip: 0,
					take: 25,
					where: {
						publishStatus: 'published',
						AND: [
							{
								OR: [
									{ caseReference: { contains: 'Nuclear' } },
									{
										AND: [{ projectName: { contains: 'Nuclear' } }]
									},
									{
										AND: [{ projectNameWelsh: { contains: 'Nuclear' } }]
									},
									{
										AND: [{ applicant: { organisationName: { contains: 'Nuclear' } } }]
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
				expect(response.status).toEqual(200);
			});
		});
	});
});
