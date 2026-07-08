const {
	APPLICATION_DB,
	APPLICATIONS_NI_DB,
	APPLICATIONS_NI_FILTER_COLUMNS,
	APPLICATIONS_FO,
	APPLICATIONS_FO_FILTERS,
	APPLICATION_API_V1,
	APPLICATION_FO,
	APPLICATIONS_BO_FILTER_COLUMNS
} = require('../__data__/application');
const { request } = require('../__data__/supertest');
const { Op } = require('sequelize');
const config = require('../../src/lib/config');
const { isBackOfficeCaseReference } = require('../../src/utils/is-backoffice-case-reference');

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
jest.mock('../../src/utils/is-backoffice-case-reference');
const mockFindAndCountAll = jest.fn();
const mockProjectFindOne = jest.fn();
jest.mock('../../src/models', () => ({
	Project: {
		findAndCountAll: (query) => mockFindAndCountAll(query),
		findOne: (attributes) => mockProjectFindOne(attributes)
	}
}));

describe('/api/v1/applications', () => {
	describe('get single application', () => {
		afterEach(() => {
			mockFindUnique.mockClear();
			mockProjectFindOne.mockClear();
		});

		it('given NI case with caseReference exists, returns 200', async () => {
			isBackOfficeCaseReference.mockReturnValue(false);
			mockProjectFindOne.mockResolvedValueOnce({ dataValues: APPLICATION_FO });

			const response = await request.get('/api/v1/applications/EN010116');

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				...APPLICATION_API_V1,
				sourceSystem: 'HORIZON'
			});
		});

		it('given Back Office case with caseReference exists, returns 200', async () => {
			isBackOfficeCaseReference.mockReturnValue(true);
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
		describe('when getAllApplications is NI', () => {
			config.backOfficeIntegration.getAllApplications = 'NI';
			beforeEach(() => {
				mockFindAndCountAll.mockResolvedValueOnce({
					rows: APPLICATIONS_NI_FILTER_COLUMNS,
					count: APPLICATIONS_NI_DB.length
				});
			});
			it('happy path', async () => {
				mockFindAndCountAll.mockResolvedValueOnce({
					rows: APPLICATIONS_NI_DB,
					count: APPLICATIONS_NI_DB.length
				});

				const response = await request.get('/api/v1/applications');

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					applications: APPLICATIONS_FO,
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 5,
					totalPages: 1,
					totalItemsWithoutFilters: 5,
					filters: APPLICATIONS_FO_FILTERS
				});
			});

			it('with filters applied', async () => {
				mockFindAndCountAll.mockResolvedValueOnce({
					rows: [APPLICATIONS_NI_DB[2], APPLICATIONS_NI_DB[3], APPLICATIONS_NI_DB[4]],
					count: 3
				});

				const filteredApplications = [APPLICATIONS_FO[2], APPLICATIONS_FO[3], APPLICATIONS_FO[4]];

				const queryString = [
					'stage=acceptance',
					'stage=recommendation',
					'region=eastern',
					'region=north_west',
					'sector=energy',
					'sector=transport'
				].join('&');

				const response = await request.get(`/api/v1/applications?${queryString}`);

				expect(mockFindAndCountAll).toBeCalledWith(
					expect.objectContaining({
						where: {
							Region: { [Op.ne]: 'Wales' },
							CaseReference: { [Op.notIn]: [] },
							[Op.and]: [
								{ Region: { [Op.in]: ['Eastern', 'North West'] } },
								{ Stage: { [Op.in]: [2, 5] } },
								{
									[Op.or]: [{ Proposal: { [Op.like]: 'EN%' } }, { Proposal: { [Op.like]: 'TR%' } }]
								}
							]
						}
					})
				);

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					applications: filteredApplications,
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 3,
					totalPages: 1,
					totalItemsWithoutFilters: 5,
					filters: APPLICATIONS_FO_FILTERS
				});
			});

			it('with search term applied', async () => {
				mockFindAndCountAll.mockResolvedValueOnce({
					rows: [APPLICATIONS_NI_DB[0]],
					count: 1
				});
				const filteredApplications = [APPLICATIONS_FO[0]];

				const response = await request.get('/api/v1/applications?searchTerm=London%20Resort');

				expect(mockFindAndCountAll).toBeCalledWith(
					expect.objectContaining({
						where: {
							Region: { [Op.ne]: 'Wales' },
							CaseReference: { [Op.notIn]: [] },
							[Op.or]: [
								{ CaseReference: { [Op.like]: '%London Resort%' } },
								{
									[Op.and]: [
										{
											ProjectName: { [Op.like]: `%London%` }
										},
										{
											ProjectName: { [Op.like]: `%Resort%` }
										}
									]
								},
								{
									[Op.and]: [
										{
											PromoterName: { [Op.like]: `%London%` }
										},
										{
											PromoterName: { [Op.like]: `%Resort%` }
										}
									]
								}
							]
						}
					})
				);

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					applications: filteredApplications,
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 1,
					totalPages: 1,
					totalItemsWithoutFilters: 5,
					filters: APPLICATIONS_FO_FILTERS
				});
			});

			it('with search term and filters applied', async () => {
				mockFindAndCountAll.mockResolvedValueOnce({
					rows: [APPLICATIONS_NI_DB[2], APPLICATIONS_NI_DB[3]],
					count: 2
				});
				const filteredApplications = [APPLICATIONS_FO[2], APPLICATIONS_FO[3]];

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

				expect(mockFindAndCountAll).toBeCalledWith(
					expect.objectContaining({
						where: {
							Region: { [Op.ne]: 'Wales' },
							CaseReference: { [Op.notIn]: [] },
							[Op.and]: [
								{ Region: { [Op.in]: ['Eastern', 'North West'] } },
								{ Stage: { [Op.in]: [2, 5] } },
								{
									[Op.or]: [{ Proposal: { [Op.like]: 'EN%' } }, { Proposal: { [Op.like]: 'TR%' } }]
								}
							],
							[Op.or]: [
								{ CaseReference: { [Op.like]: '%Nuclear%' } },
								{
									[Op.and]: [
										{
											ProjectName: { [Op.like]: `%Nuclear%` }
										}
									]
								},
								{
									[Op.and]: [
										{
											PromoterName: { [Op.like]: `%Nuclear%` }
										}
									]
								}
							]
						}
					})
				);

				expect(response.status).toEqual(200);
				expect(response.body).toEqual({
					applications: filteredApplications,
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 2,
					totalItemsWithoutFilters: 5,
					totalPages: 1,
					filters: APPLICATIONS_FO_FILTERS
				});
			});
		});
		describe('when getAllApplications is BO', () => {
			beforeEach(() => {
				config.backOfficeIntegration.getAllApplications = 'BO';
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
					totalItems: 1,
					filters: [
						{
							name: 'stage',
							value: 'pre_application',
							label: 'Pre-application',
							count: 1,
							label_cy: 'Cyn-ymgeisio'
						},
						{
							name: 'region',
							value: 'yorkshire_and_the_humber',
							label: 'Yorkshire and the Humber',
							count: 1,
							label_cy: 'Swydd Efrog a’r Humber'
						},
						{
							name: 'sector',
							value: 'energy',
							label: 'Energy',
							count: 1,
							label_cy: 'Ynni'
						}
					]
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
