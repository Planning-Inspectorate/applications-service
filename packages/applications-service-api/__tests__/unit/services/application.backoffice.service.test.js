const {
	getApplication,
	getAllApplications,
	getAllApplicationsDownload
} = require('../../../src/services/application.backoffice.service');
const config = require('../../../src/lib/config');
jest.mock('../../../src/repositories/project.backoffice.repository');
const {
	getByCaseReference,
	getAllApplications: getAllApplicationsRepository
} = require('../../../src/repositories/project.backoffice.repository');
const {
	getAllNIApplications,
	getNIApplication,
	getAllNIApplicationsDownload
} = require('../../../src/services/application.ni.service');
const {
	getAllMergedApplications,
	getAllMergedApplicationsDownload
} = require('../../../src/services/application.merge.service');
const {
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi,
	mapNIApplicationToApi,
	buildApplicationsFiltersFromBOApplications
} = require('../../../src/utils/application.mapper');
const {
	APPLICATION_DB,
	APPLICATION_FO,
	APPLICATION_API,
	APPLICATIONS_FO_FILTERS
} = require('../../__data__/application');
const { mapApplicationsToCSV } = require('../../../src/utils/map-applications-to-csv');
const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');
jest.mock('../../../src/utils/application.mapper');
jest.mock('../../../src/services/application.ni.service');
jest.mock('../../../src/services/application.merge.service');
jest.mock('../../../src/utils/map-applications-to-csv');
jest.mock('../../../src/utils/is-backoffice-case-reference');

describe('application.backoffice.service', () => {
	beforeAll(() => {
		config.logger.level = 'info';
		isBackOfficeCaseReference.mockImplementation((caseReference) => caseReference === 'BC0110001');
	});
	describe('getApplication', () => {
		it('invokes getBackOfficeApplication if BO caseReference', async () => {
			getByCaseReference.mockResolvedValueOnce(APPLICATION_DB);

			await getApplication('BC0110001');

			expect(getByCaseReference).toHaveBeenCalledWith('BC0110001');
			expect(mapBackOfficeApplicationToApi).toHaveBeenCalledWith(APPLICATION_DB);
		});

		it('invokes getNIApplication if NI caseReference', async () => {
			getNIApplication.mockResolvedValueOnce(APPLICATION_FO);

			await getApplication('EN010009');

			expect(getNIApplication).toHaveBeenCalledWith('EN010009');
			expect(mapNIApplicationToApi).toHaveBeenCalledWith(APPLICATION_FO);
		});
	});
	describe('getAllApplications', () => {
		it('invokes getAllNIApplications if NI', async () => {
			config.backOfficeIntegration.getAllApplications = 'NI';
			await getAllApplications();
			expect(getAllNIApplications).toHaveBeenCalled();
		});
		it('invokes getAllNIApplications if getAllApplications is not set', async () => {
			config.backOfficeIntegration.getAllApplications = undefined;
			await getAllApplications();
			expect(getAllNIApplications).toHaveBeenCalled();
		});
		it('invokes getAllMergedApplications if MERGE', async () => {
			config.backOfficeIntegration.getAllApplications = 'MERGE';
			await getAllApplications();
			expect(getAllMergedApplications).toHaveBeenCalled();
		});
		describe('when BO', () => {
			beforeEach(() => {
				config.backOfficeIntegration.getAllApplications = 'BO';
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
				buildApplicationsFiltersFromBOApplications.mockReturnValue(APPLICATIONS_FO_FILTERS);
				mapBackOfficeApplicationsToApi.mockReturnValue([APPLICATION_API]);
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
				expect(mapBackOfficeApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
			});

			it('calls buildApplicationsFiltersFromBOApplications', async () => {
				await getAllApplications({});
				expect(buildApplicationsFiltersFromBOApplications).toHaveBeenCalledWith([APPLICATION_DB]);
			});

			it('maps and returns result', async () => {
				const result = await getAllApplications({});

				expect(mapBackOfficeApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
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
	});
	describe('getAllApplicationsDownload', () => {
		describe('when NI', () => {
			beforeEach(() => {
				config.backOfficeIntegration.getAllApplications = 'NI';
			});
			it('invokes getAllNIApplicationsDownload', async () => {
				await getAllApplicationsDownload();
				expect(getAllNIApplicationsDownload).toHaveBeenCalled();
			});
		});
		describe('when MERGE', () => {
			beforeEach(() => {
				config.backOfficeIntegration.getAllApplications = 'MERGE';
			});
			it('invokes getAllMergedApplicationsDownload', async () => {
				await getAllApplicationsDownload();
				expect(getAllMergedApplicationsDownload).toHaveBeenCalled();
			});
		});
		describe('when BO', () => {
			beforeEach(() => {
				config.backOfficeIntegration.getAllApplications = 'BO';
				getAllApplicationsRepository.mockResolvedValue({
					applications: [APPLICATION_DB],
					count: 1
				});
				mapBackOfficeApplicationsToApi.mockReturnValue([APPLICATION_API]);
			});
			it('invokes getAllBOApplicationsDownload', async () => {
				await getAllApplicationsDownload();
				expect(getAllApplicationsRepository).toHaveBeenCalled();
			});
			it('maps applications to CSV', async () => {
				await getAllApplicationsDownload();
				expect(mapBackOfficeApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
				expect(mapApplicationsToCSV).toHaveBeenCalledWith([APPLICATION_API]);
			});
		});
	});
});
