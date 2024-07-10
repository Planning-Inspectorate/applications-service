const {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
} = require('../../../src/services/application.service');
const config = require('../../../src/lib/config');
const {
	getByCaseReference,
	getAllApplications: getAllApplicationsRepository
} = require('../../../src/repositories/project.repository');
jest.mock('../../../src/repositories/project.repository');
const {
	buildApplicationsFiltersFromApplications,
	mapApplicationToApi,
	mapApplicationsToApi
} = require('../../../src/utils/application.mapper');
const {
	APPLICATION_DB,
	APPLICATION_API,
	APPLICATIONS_FO_FILTERS
} = require('../../__data__/application');
const mapApplicationsToCSV = require('../../../src/utils/map-applications-to-csv');
jest.mock('../../../src/utils/application.mapper');
jest.mock('../../../src/utils/map-applications-to-csv');

describe('application.service', () => {
	beforeAll(() => {
		config.logger.level = 'info';
	});
	describe('getApplication', () => {
		it('invokes getBackOfficeApplication if BO caseReference', async () => {
			getByCaseReference.mockResolvedValueOnce(APPLICATION_DB);

			await getApplication('BC0110001');

			expect(getByCaseReference).toHaveBeenCalledWith('BC0110001');
			expect(mapApplicationToApi).toHaveBeenCalledWith(APPLICATION_DB);
		});
	});
	describe('getAllApplications', () => {
		beforeEach(() => {
			getAllApplicationsRepository
				// getting applications
				.mockResolvedValueOnce({
					applications: [APPLICATION_DB],
					count: 1
				})
				// getting all applications to create filters
				.mockResolvedValueOnce({
					applications: [APPLICATION_DB],
					count: 1
				});
			buildApplicationsFiltersFromApplications.mockReturnValue(APPLICATIONS_FO_FILTERS);
			mapApplicationsToApi.mockReturnValue([APPLICATION_API]);
		});
		describe('pagination', () => {
			describe('when page num', () => {
				describe('is provided', () => {
					it('calls findAll with offset', async () => {
						const mockPageNum = 2;
						const mockPageSize = 25;

						await getAllApplications({ page: mockPageNum, size: mockPageSize });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							size: mockPageSize,
							offset: mockPageSize * (mockPageNum - 1),
							orderBy: {
								projectName: 'asc'
							}
						});
					});
				});

				describe('is not provided', () => {
					it('calls findAll with offset 0', async () => {
						const mockPageSize = 25;

						await getAllApplications({ size: mockPageSize });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: mockPageSize,
							orderBy: {
								projectName: 'asc'
							}
						});
					});
				});
			});

			describe('when page size', () => {
				describe('is provided under 100', () => {
					it('calls findAll with limit', async () => {
						const mockPageSize = 25;

						await getAllApplications({ size: mockPageSize });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: mockPageSize,
							orderBy: {
								projectName: 'asc'
							}
						});
					});
				});

				describe('is provided over 100', () => {
					it('calls findAll with limit 100', async () => {
						await getAllApplications({ size: 101 });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: 100,
							orderBy: {
								projectName: 'asc'
							}
						});
					});
				});

				describe('is not provided', () => {
					it('calls findAll with default limit 25', async () => {
						await getAllApplications({});

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: 25,
							orderBy: {
								projectName: 'asc'
							}
						});
					});
				});
			});
		});

		describe('sorting', () => {
			describe('when sort is provided', () => {
				describe('when sort has key but no direction', () => {
					it.each([
						['ProjectName', { projectName: 'asc' }],
						['PromoterName', { applicant: { organisationName: 'asc' } }],
						['DateOfDCOSubmission', { dateOfDCOSubmission: 'asc' }],
						['ConfirmedDateOfDecision', { confirmedDateOfDecision: 'asc' }]
					])('calls findAll with orderBy: [[key, asc]]', async (sort, orderBy) => {
						await getAllApplications({ sort });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: 25,
							orderBy
						});
					});
				});

				describe('when sort has key and direction', () => {
					it.each([
						['+ProjectName', { projectName: 'asc' }],
						['-ProjectName', { projectName: 'desc' }],
						['+PromoterName', { applicant: { organisationName: 'asc' } }],
						['-PromoterName', { applicant: { organisationName: 'desc' } }],
						['+DateOfDCOSubmission', { dateOfDCOSubmission: 'asc' }],
						['-DateOfDCOSubmission', { dateOfDCOSubmission: 'desc' }],
						['+ConfirmedDateOfDecision', { confirmedDateOfDecision: 'asc' }],
						['-ConfirmedDateOfDecision', { confirmedDateOfDecision: 'desc' }],
						['+Stage', { stage: 'asc' }],
						['-Stage', { stage: 'desc' }]
					])('calls findAll with orderBy', async (sort, orderBy) => {
						await getAllApplications({ sort });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: 25,
							orderBy
						});
					});
				});

				describe('when sort key is invalid', () => {
					it('calls findAll with default orderBy', async () => {
						await getAllApplications({ sort: 'foo' });

						expect(getAllApplicationsRepository).toHaveBeenCalledWith({
							offset: 0,
							size: 25,
							orderBy: {
								projectName: 'asc'
							}
						});
					});
				});
			});

			describe('when sort is not provided', () => {
				it('calls findAll with default orderBy', async () => {
					await getAllApplications({});

					expect(getAllApplicationsRepository).toHaveBeenCalledWith({
						offset: 0,
						size: 25,
						orderBy: {
							projectName: 'asc'
						}
					});
				});
			});
		});

		describe('filtering', () => {
			it('passes applied filters to repository in format for NI database', async () => {
				await getAllApplications({
					stage: ['pre_application', 'acceptance'],
					region: ['eastern'],
					sector: ['transport', 'energy']
				});

				expect(getAllApplicationsRepository).toHaveBeenCalledWith({
					offset: 0,
					size: 25,
					orderBy: {
						projectName: 'asc'
					},
					filters: {
						stage: ['pre_application', 'acceptance'],
						region: ['eastern'],
						sector: ['transport', 'energy']
					}
				});
			});
		});

		describe('searching', () => {
			it('passes search term to repository', async () => {
				await getAllApplications({ searchTerm: 'foo bar' });

				expect(getAllApplicationsRepository).toHaveBeenCalledWith({
					offset: 0,
					size: 25,
					orderBy: {
						projectName: 'asc'
					},
					searchTerm: 'foo bar'
				});
			});
		});
		it('maps result to API format', async () => {
			await getAllApplications({});
			expect(mapApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
		});

		it('calls buildApplicationsFiltersFromApplications', async () => {
			await getAllApplications({});
			expect(buildApplicationsFiltersFromApplications).toHaveBeenCalledWith([APPLICATION_DB]);
		});

		it('maps and returns result', async () => {
			const result = await getAllApplications({});

			expect(mapApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
			expect(result).toEqual({
				applications: [APPLICATION_API],
				totalItems: 1,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1,
				totalItemsWithoutFilters: 1,
				filters: APPLICATIONS_FO_FILTERS
			});
		});
	});
	describe('getAllApplicationsDownload', () => {
		beforeEach(() => {
			config.backOfficeIntegration.getAllApplications = 'BO';
			getAllApplicationsRepository.mockResolvedValue({
				applications: [APPLICATION_DB],
				count: 1
			});
			mapApplicationsToApi.mockReturnValue([APPLICATION_API]);
		});
		it('invokes getAllBOApplicationsDownload', async () => {
			await getAllApplicationsDownload();
			expect(getAllApplicationsRepository).toHaveBeenCalled();
		});
		it('maps applications to CSV', async () => {
			await getAllApplicationsDownload();
			expect(mapApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
			expect(mapApplicationsToCSV).toHaveBeenCalledWith([APPLICATION_API]);
		});
	});
});
